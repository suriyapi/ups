const snmp = require("net-snmp");
const fs = require("fs");
const { Parser } = require("json2csv");

// กำหนดค่าเป้าหมาย
const target = "10.50.11.11";
const community = "public";

// สร้าง session สำหรับ SNMP
const session = snmp.createSession(target, community);

// กำหนด OID ที่ต้องการทำ walk (ในกรณีนี้เป็น OID สำหรับ UPS-MIB ที่เริ่มต้นด้วย 1.3.6.1.2.1.33)
const oid = "1.3.6.1.2.1.33";

// เก็บข้อมูลที่ได้รับจาก SNMP
let data = [];

// ใช้ snmpWalk เพื่อดึงข้อมูลทั้งหมดที่เกี่ยวข้องกับ OID ที่ระบุ
session.walk(oid, 20, (varbinds) => {
    // วนลูปเพื่อแสดงข้อมูลที่ได้รับกลับมา
    for (let i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError(varbinds[i])) {
            console.error(snmp.varbindError(varbinds[i]));
        } else {
            console.log(varbinds[i].oid + " = " + varbinds[i].value);
            data.push({ oid: varbinds[i].oid, value: varbinds[i].value });
        }
    }
}, (error) => {
    if (error) {
        console.error("Error:", error);
    } else {
        // สร้างไฟล์ CSV จากข้อมูลที่ได้รับ
        const json2csvParser = new Parser({ fields: ["oid", "value"] });
        const csv = json2csvParser.parse(data);
        
        // บันทึก CSV ลงไฟล์
        fs.writeFile("snmp_output.csv", csv, (err) => {
            if (err) {
                console.error("Error writing to CSV file:", err);
            } else {
                console.log("Data has been saved to snmp_output.csv");
            }
        });
    }
    // ปิด session เมื่อเสร็จสิ้น
    session.close();
});
