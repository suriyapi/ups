const snmp = require('net-snmp');

// ตั้งค่า IP ของ UPS และ Community String
const ip = '10.50.11.11';  // เปลี่ยนเป็น IP ของ UPS ที่คุณใช้งาน
const community = 'public';  // เปลี่ยนตามค่า community string ของ UPS

// OID สำหรับตรวจสอบแหล่งพลังงาน (Output Source)
const oid = '1.3.6.1.4.1.318.1.1.1.2.2.1.0';  // Output Source OID

// สร้าง session SNMP
const session = snmp.createSession(ip, community);

// ดึงข้อมูลจาก OID ที่กำหนด
session.get([oid], function (error, varbinds) {
    if (error) {
        console.error("เกิดข้อผิดพลาด: ", error.toString());
    } else {
        // ตรวจสอบ Output Source
        const outputSource = varbinds[0].value;
        console.log(`Output Source (1.3.6.1.4.1.318.1.1.1.2.2.1.0): ${outputSource}`);
        
        if (outputSource == 3) {
            console.log("UPS ออนไลน์อยู่ (กำลังใช้ไฟฟ้าหลัก)");
        } else if (outputSource == 5) {
            console.log("UPS ออฟไลน์ (กำลังใช้พลังงานจากแบตเตอรี่)");
        } else {
            console.log("ไม่สามารถระบุสถานะของ UPS ได้");
        }
    }

    // ปิด session หลังจากดึงข้อมูลเสร็จ
    session.close();
});
