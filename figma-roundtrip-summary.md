# สรุปโจทย์ฝึก — Reverse engineering in design (Figma REST API)

> บันทึกผลการทำโจทย์ round-trip ของคอร์ส Design Lazyyy เพื่อให้คน (หรือ AI) อ่านต่อแล้วเข้าใจ
> ได้ทั้งหมดว่าทำอะไร ด้วยเครื่องมือไหน บนไฟล์ไหน และผลลัพธ์เป็นอย่างไร

## Context

- **แนวคิด:** `figma-rest-api` เป็น round-trip 2 ทาง — ฝั่ง **อ่าน** ใช้ REST API ดึงสี +
  variable binding ออกมาเป็น report แล้ว map เข้า design token; ฝั่ง **เขียน** ใช้ Figma Plugin
  แก้สีที่ contrast ไม่ผ่าน WCAG กลับเข้าไฟล์ หัวใจของโจทย์คือ: ดึง documentation →
  เขียนแก้กลับ → revert ให้ไฟล์กลับสภาพเดิม (เหมือน undo / version control แต่ของไฟล์ Figma)
- **เครื่องมือ:** `figma-rest-api` ติดตั้งแบบ global (`npm i -g figma-rest-api`)
  - CLI `figma-pull` — ฝั่งอ่าน (ดึงสี + bindings ออกมาเป็น JSON)
  - Plugin **WCAG Contrast Fix** — ฝั่งเขียน (อยู่ใน
    `/usr/local/lib/node_modules/figma-rest-api/figma-plugin/`, import เข้า Figma desktop
    ผ่าน Plugins → Development → Import plugin from manifest)
- **ไฟล์ที่ฝึก:** file key `NN6Wp4Hgsug3OKhiQdL27d` · node `72-2591` (canvas "Accordion")
  - มี backup โดย duplicate ไฟล์ไว้ก่อนแล้ว จึงฝึกบนไฟล์เดิมได้

## การเชื่อม 2 ไฟล์ (hybrid: REST pull + plugin push)

"2 ไฟล์" = design token ของโปรเจกต์ (`app/globals.css`, ที่ Storybook ใช้แสดง — ผ่าน WCAG)
↔ Figma Variables ในไฟล์ design source การเชื่อมแบ่งทิศทางตาม scope/plan ที่ทำได้จริง:

| ทิศทาง | endpoint / เครื่องมือ | scope ที่ใช้ | สถานะ |
|---|---|---|---|
| **pull** (Figma → token) | REST `GET /v1/files/:key/nodes` + `scripts/figma-pull.mjs` | `file_content:read` | ✅ ทำงาน — ดึงสี map เข้า token ด้วย OKLab ΔE |
| pull ชื่อ variable | REST `GET /v1/files/:key/variables/local` | `file_variables:read` | ⚠️ PAT ปัจจุบันไม่มี scope → bindings โชว์เป็น raw ID |
| **push** (token → **Variable**) | **Figma plugin** Token Sync (`figma-token-sync/`) — `figma.variables.setValueForMode()` | — (รันในแอป) | ✅ ทำงาน — เขียนค่า token ลง Variable ตรงๆ ไม่ติด Enterprise |
| push (WCAG fix ระดับ node) | **Figma plugin** WCAG Contrast Fix (แก้ fill ของ text node) | — (รันในแอป) | ✅ ทำงาน — แต่ **ไม่แตะ Variable** (node-level) |
| push ผ่าน REST (ทดลอง) | `POST /v1/files/:key/variables` + `scripts/figma-push.mjs` | `file_variables:write` | ❌ ยืนยันแล้ว 403 (ไม่มี scope; และ REST write ยัง gate เฉพาะ Enterprise) |

**สรุปการตัดสินใจ:** REST write ของ Variables ถูก gate → ฝั่งเขียนใช้ **plugin** แทน
`scripts/figma-push.mjs` เก็บไว้เป็นหลักฐานว่า REST write ใช้ไม่ได้บนบัญชี/แพลนนี้
(รัน `npm run figma:push -- --list` แล้วได้ HTTP 403 "requires the file_variables:read scope")

### push สองตัวต่างกันอย่างไร

- **WCAG Contrast Fix** (มากับ package) = แก้ contrast โดยเขียนสีลง **fill ของ text node** ตรงๆ
  → ถ้า fill นั้น bind Variable อยู่ จะ **detach** binding ทิ้ง และ**ไม่แก้ค่า token** เลย
  (รันบน `figma.currentPage` หน้าเดียว — จึง "ทำแค่หน้าที่เปิดอยู่")
- **Token Sync** (เขียนใหม่ในโปรเจกต์นี้, `figma-token-sync/`) = อ่านค่า token จาก
  `app/globals.css` แล้วเขียนลง **Figma Variable ที่ชื่อตรงกัน** ผ่าน `setValueForMode()`
  ครบทุก mode (light/dark) → เป็นฝั่ง write ที่ "โดน Variable" จริงของ round-trip
  - ค่า token ถูก **bake** ลง `figma-token-sync/code.js` ด้วย `npm run figma:plugin:build`
    (plugin อ่านไฟล์ในเครื่องไม่ได้ จึงต้องฝังค่าไว้ตอน build) — ปัจจุบัน 35 token (light+dark)
  - import: Figma desktop → Plugins → Development → Import plugin from manifest →
    `figma-token-sync/manifest.json` → รัน **Token Sync → Variables**

## ขั้นตอนที่ทำ (round-trip ครบลูป)

1. **baseline** — ตั้ง version `before WCAG fix` (File → Save to version history) ใน Figma
   แล้วรัน `figma-pull --file NN6Wp4Hgsug3OKhiQdL27d 72-2591 --out before.json`
   → ได้ 6 solid colors + 985 variable bindings
2. **เขียนแก้** — รัน plugin **WCAG Contrast Fix** ใน Figma desktop แก้สี text/badge
   ที่ contrast ไม่ผ่าน WCAG AA (4.5:1)
3. **revert** — Version history → Restore กลับไป version `before WCAG fix`
4. **ยืนยัน** — `figma-pull ... --out after.json` แล้ว `diff before.json after.json`
   → **ตรงกันเป๊ะ (identical)** ✅ revert คืนสภาพไฟล์สมบูรณ์

## ข้อ 5 — ใช้ revert วิธีไหน และต่างจาก Cmd+Z อย่างไร

ใช้ **Version history → Restore** กลับไป version `before WCAG fix` ที่เซฟไว้ก่อนแก้

| | Cmd+Z (Undo) | Version history Restore |
|---|---|---|
| ย้อนอะไร | action ล่าสุดทีละขั้นใน undo stack | กระโดดกลับทั้ง snapshot ในครั้งเดียว |
| ขอบเขต | เฉพาะเซสชันปัจจุบัน — ปิดไฟล์/หมด stack แล้วหาย | เก็บถาวร เปิดไฟล์ใหม่ก็ยัง restore ได้ |
| เหมาะกับ | เลิกทำที่เพิ่งกดผิดไม่กี่ขั้น | ย้อนกลับจุดที่ตั้งใจเซฟไว้ แม้แก้ไปหลายสิบขั้น |
| เทียบกับ git | `undo` การแก้ล่าสุด | `git revert` / checkout กลับไป commit ที่ตั้งชื่อไว้ |

**สรุป:** Cmd+Z = undo ทีละ action สำหรับความผิดพลาดเล็กๆ ในเซสชัน ส่วน Version history
Restore = จุด commit ถาวรที่ตั้งใจไว้ ย้อนข้ามการแก้จำนวนมากได้ในก้าวเดียวและไม่หายแม้ปิดไฟล์
จึงปลอดภัยกว่าสำหรับการ revert ครั้งนี้

## ไฟล์ที่เกี่ยวข้อง

- `before.json` — baseline ก่อนแก้ (node 72-2591)
- `after.json` — หลัง revert (เทียบแล้วตรงกับ before.json)
