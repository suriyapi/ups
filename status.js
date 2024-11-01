const snmp = require("net-snmp");

const devices = [
    { ip: "10.50.11.62", location: "คณะสัตวแพทย์" },
    { ip: "10.50.11.64", location: "คณะสัตวแพทย์" },
    { ip: "10.50.11.66", location: "คณะสัตวแพทย์" },
    { ip: "10.40.1.10", location: "แฟลตบุคลากร 1" },
    { ip: "10.50.11.21", location: "แฟลตบุคลากร 2" },
    { ip: "10.50.11.23", location: "แฟลตบุคลากร 3" },
    { ip: "10.50.11.25", location: "แฟลตบุคลากร 4" },
    { ip: "10.50.11.27", location: "แฟลตบุคลากร 5" },
    { ip: "10.50.11.29", location: "แฟลตบุคลากร 6" },
    { ip: "10.50.11.31", location: "แฟลตบุคลากร 7" },
    { ip: "10.50.11.33", location: "แฟลตบุคลากร 8" },
    { ip: "10.50.11.35", location: "แฟลตบุคลากร 9 main" },
    { ip: "10.50.11.37", location: "แฟลตบุคลากร 9 ชั้น 1" },
    { ip: "10.50.11.39", location: "แฟลตบุคลากร 9 ชั้น 2" },
    { ip: "10.50.11.41", location: "แฟลตบุคลากร 9 ชั้น 3" },
    { ip: "10.50.11.43", location: "แฟลตบุคลากร 10 main" },
    { ip: "10.50.11.45", location: "แฟลตบุคลากร 10 ชั้น 1" },
    { ip: "10.50.11.47", location: "แฟลตบุคลากร 10 ชั้น 2" },
    { ip: "10.50.11.49", location: "แฟลตบุคลากร 10 ชั้น 3" },
    { ip: "10.50.11.51", location: "แฟลตบุคลากร 11 main" },
    { ip: "10.50.11.53", location: "แฟลตบุคลากร 11 ชั้น 1" },
    { ip: "10.50.11.55", location: "แฟลตบุคลากร 11 ชั้น 2" },
    { ip: "10.50.11.57", location: "แฟลตบุคลากร 11 ชั้น 3" },
    { ip: "10.50.8.100", location: "ศูนย์มหาลัย" },
    { ip: "10.50.13.1", location: "ศึกษาศาสตร์" },
    { ip: "10.50.13.3", location: "วิศวะ" },
    { ip: "10.50.11.12", location: "ห้องสมุด" },
    { ip: "10.50.11.67", location: "หอพัก 25 ชั้น 1" },
    { ip: "10.50.11.69", location: "หอพัก 25 ชั้น 2" },
    { ip: "10.50.11.71", location: "หอพัก 25 ชั้น 3" },
    { ip: "10.50.11.73", location: "หอพัก 25 ชั้น 4" },
    { ip: "10.50.11.75", location: "หอพัก 26 ชั้น 1" },
    { ip: "10.50.11.77", location: "หอพัก 26 ชั้น 2" },
    { ip: "10.50.11.79", location: "หอพัก 26 ชั้น 3" },
    { ip: "10.50.11.81", location: "หอพัก 26 ชั้น 4" },
    { ip: "10.50.11.83", location: "หอพัก 27 ชั้น 1" },
    { ip: "10.50.11.85", location: "หอพัก 27 ชั้น 2" },
    { ip: "10.50.11.87", location: "หอพัก 27 ชั้น 3" },
    { ip: "10.50.11.89", location: "หอพัก 27 ชั้น 4" },
    { ip: "10.50.11.91", location: "หอพัก 28 ชั้น 1" },
    { ip: "10.50.11.93", location: "หอพัก 28 ชั้น 2" },
    { ip: "10.50.11.95", location: "หอพัก 28 ชั้น 3" },
    { ip: "10.50.11.97", location: "หอพัก 28 ชั้น 4" },
    { ip: "10.50.11.99", location: "หอพัก 29 ชั้น 1" },
    { ip: "10.50.11.101", location: "หอพัก 29 ชั้น 2" },
    { ip: "10.50.11.103", location: "หอพัก 29 ชั้น 3" },
    { ip: "10.50.11.105", location: "หอพัก 29 ชั้น 4" },
    { ip: "10.50.11.107", location: "หอพัก 30 ชั้น 1" },
    { ip: "10.50.11.109", location: "หอพัก 30 ชั้น 2" },
    { ip: "10.50.11.111", location: "หอพัก 30 ชั้น 3" },
    { ip: "10.50.11.113", location: "หอพัก 30 ชั้น 4" },
    { ip: "10.50.11.115", location: "หอพัก 31 ชั้น 1" },
    { ip: "10.50.11.117", location: "หอพัก 31 ชั้น 2" },
    { ip: "10.50.11.119", location: "หอพัก 31 ชั้น 3" },
    { ip: "10.50.11.121", location: "หอพัก 31 ชั้น 4" },
    { ip: "10.50.11.123", location: "หอพัก 17" },
    { ip: "10.50.11.125", location: "หอพัก 18" },
    { ip: "10.50.11.11", location: "สำนักส่งเสริม" },
];

const oid = "1.3.6.1.2.1.33.1.2.1.0";
const timeout = 3000;

devices.forEach(device => {
    const session = snmp.createSession(device.ip, "public");

    const timeoutHandle = setTimeout(() => {
        console.log(`Timeout: Skipping ${device.location} (${device.ip}) due to slow response`);
        session.close(); // ปิด session เมื่อเกิด timeout
    }, timeout);

    session.get([oid], (error, varbinds) => {
        clearTimeout(timeoutHandle);

        if (error) {
            console.error(`Error connecting to ${device.location} (${device.ip}): ${error.message}`);
            // ข้าม IP นี้หากเกิดข้อผิดพลาดในการเชื่อมต่อ
            session.close();
            return;
        }

        if (snmp.isVarbindError(varbinds[0])) {
            console.error(`SNMP Error on ${device.location} (${device.ip}):`, snmp.varbindError(varbinds[0]));
        } else {
            console.log(`Result from ${device.location} (${device.ip}): ${varbinds[0].oid} = ${varbinds[0].value}`);
        }

        // ปิด session หลังจากได้รับผลลัพธ์
        session.close(() => {
            console.log(`Session closed for ${device.location} (${device.ip})`);
        });
    });
});
