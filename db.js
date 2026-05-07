/**
 * db.js - Mock Database
 * ระบบบริหารภาระงานอัจฉริยะ — สำหรับบุคลากรสายสนับสนุนมหาวิทยาลัย
 * มอดูล 4: บริหารศักยภาพและอัตรากำลัง (Capacity & Workforce Planning)
 */

const DB = {
  init() {
    if (!localStorage.getItem('m4_initialized_v5')) {
      this.reset();
    }
  },

  reset() {
    const defaultData = {
      // D0 ข้อมูลผู้ใช้งานระบบ
      users: [
        {
          id: 'U001', username: 'hr', name: 'นางสาวจันทิมา อ่อนละมุน', role: 'HR',
          dept: 'กองบริหารทรัพยากรบุคคล', email: 'jantima.on@sut.ac.th',
          phone: '02-549-3000 ต่อ 1001', status: 'active'
        },
        {
          id: 'U002', username: 'dh', name: 'นายวีระพงศ์ ตันติวิทยา', role: 'DH',
          dept: 'กองเทคโนโลยีสารสนเทศ', email: 'weerapong.ta@sut.ac.th',
          phone: '02-549-3000 ต่อ 2001', status: 'active'
        }
      ],

      // D1 ข้อมูลบุคลากรสายสนับสนุน
      employees: [
        {
          id: 'E001', name: 'นายธนากร วงศ์ประเสริฐ', dept: 'กองเทคโนโลยีสารสนเทศ',
          role: 'นักวิเคราะห์ระบบสารสนเทศ', level: 'ชำนาญการ',
          startDate: '2019-06-01', education: 'วศ.บ. วิศวกรรมคอมพิวเตอร์', status: 'active'
        },
        {
          id: 'E002', name: 'นางสาวพรทิพย์ ศรีสมบูรณ์', dept: 'กองบริหารทรัพยากรบุคคล',
          role: 'นักบริหารงานบุคคล', level: 'ปฏิบัติการ',
          startDate: '2022-01-10', education: 'รป.บ. รัฐประศาสนศาสตร์', status: 'active'
        },
        {
          id: 'E003', name: 'นายอรรถพล มีชัยภูมิ', dept: 'กองเทคโนโลยีสารสนเทศ',
          role: 'นักพัฒนาระบบสารสนเทศ', level: 'ปฏิบัติการ',
          startDate: '2021-07-15', education: 'วท.บ. เทคโนโลยีสารสนเทศ', status: 'active'
        },
        {
          id: 'E004', name: 'นางสาวณัฐธิดา รุ่งเรือง', dept: 'กองเทคโนโลยีสารสนเทศ',
          role: 'ผู้ดูแลระบบเครือข่าย', level: 'ปฏิบัติการ',
          startDate: '2023-03-01', education: 'วศ.บ. วิศวกรรมไฟฟ้า', status: 'active'
        },
        {
          id: 'E005', name: 'นายสมชาย ภูมิใจ', dept: 'กองการเงินและบัญชี',
          role: 'นักวิชาการการเงินและบัญชี', level: 'ชำนาญการ',
          startDate: '2018-04-01', education: 'บช.บ. การบัญชี', status: 'active'
        },
        {
          id: 'E006', name: 'นางสาวสุนิสา แสงสว่าง', dept: 'กองแผนงาน',
          role: 'นักวิเคราะห์นโยบายและแผน', level: 'ชำนาญการพิเศษ',
          startDate: '2015-09-01', education: 'รป.ม. รัฐประศาสนศาสตร์', status: 'active'
        }
      ],

      // D2 ข้อมูลศักยภาพ (ผลการประเมิน)
      evaluations: [
        {
          id: 'EV001', empId: 'E001', date: '2026-04-15', round: '1/2569',
          evaluator: 'นายวีระพงศ์ ตันติวิทยา',
          scores: { 'SK01': 4, 'SK02': 5, 'SK03': 3, 'SK04': 4 },
          note: 'มีความสามารถโดดเด่นด้านการพัฒนาระบบ พร้อมสำหรับงานที่ซับซ้อน'
        },
        {
          id: 'EV002', empId: 'E003', date: '2026-04-16', round: '1/2569',
          evaluator: 'นายวีระพงศ์ ตันติวิทยา',
          scores: { 'SK01': 3, 'SK02': 3, 'SK03': 2, 'SK04': 3 },
          note: 'ต้องพัฒนาด้านความมั่นคงปลอดภัยไซเบอร์เป็นลำดับแรก'
        },
        {
          id: 'EV003', empId: 'E004', date: '2026-04-17', round: '1/2569',
          evaluator: 'นายวีระพงศ์ ตันติวิทยา',
          scores: { 'SK01': 3, 'SK02': 2, 'SK03': 4, 'SK04': 2 },
          note: 'เชี่ยวชาญด้านเครือข่าย แต่ขาดทักษะการพัฒนาระบบ ควรฝึกอบรมเพิ่ม'
        }
      ],

      // D3 ข้อมูลกรอบอัตรากำลังเป้าหมาย
      workforce: [
        {
          dept: 'กองเทคโนโลยีสารสนเทศ', deptCode: 'IT', current: 3, target: 5,
          workload: 'สูงมาก', workloadPct: 133,
          note: 'ภาระงานเกินมาตรฐาน 33% เนื่องจากโครงการพัฒนาระบบบริหารมหาวิทยาลัย'
        },
        {
          dept: 'กองบริหารทรัพยากรบุคคล', deptCode: 'HR', current: 2, target: 3,
          workload: 'ปกติ', workloadPct: 90,
          note: 'อัตรากำลังเพียงพอต่อภาระงานปัจจุบัน แต่ควรเพิ่มอีก 1 อัตรา'
        },
        {
          dept: 'กองการเงินและบัญชี', deptCode: 'FIN', current: 4, target: 4,
          workload: 'ปกติ', workloadPct: 85, note: 'อยู่ในเกณฑ์ปกติ'
        },
        {
          dept: 'กองแผนงาน', deptCode: 'PLAN', current: 3, target: 3,
          workload: 'ปกติ', workloadPct: 78, note: 'ปริมาณงานลดลงในไตรมาสนี้'
        }
      ],

      // D4 เกณฑ์มาตรฐานทักษะ (Competency Framework)
      skills: [
        {
          id: 'SK01', name: 'การสื่อสารและการประสานงาน', type: 'หลัก',
          desc: 'ความสามารถในการสื่อสาร ถ่ายทอดข้อมูล และประสานงานอย่างมีประสิทธิภาพ', requiredScore: 3
        },
        {
          id: 'SK02', name: 'การพัฒนาระบบสารสนเทศ', type: 'เฉพาะด้าน',
          desc: 'การออกแบบ พัฒนา และดูแลระบบสารสนเทศด้วยเทคโนโลยีสมัยใหม่', requiredScore: 4
        },
        {
          id: 'SK03', name: 'ความมั่นคงปลอดภัยทางไซเบอร์', type: 'เฉพาะด้าน',
          desc: 'ความรู้และทักษะด้านการรักษาความปลอดภัยของระบบสารสนเทศและเครือข่าย', requiredScore: 4
        },
        {
          id: 'SK04', name: 'การวิเคราะห์ข้อมูลและจัดทำรายงาน', type: 'หลัก',
          desc: 'การวิเคราะห์ข้อมูล จัดทำรายงาน และนำเสนอต่อผู้บริหารได้อย่างถูกต้อง', requiredScore: 3
        }
      ],

      // D5 แผนพัฒนาบุคลากรรายบุคคล (IDP)
      developmentPlans: [
        {
          id: 'DP001', empId: 'E003', empName: 'นายอรรถพล มีชัยภูมิ',
          skillId: 'SK03', skillName: 'ความมั่นคงปลอดภัยทางไซเบอร์',
          method: 'อบรมหลักสูตรผู้เชี่ยวชาญด้านความมั่นคงปลอดภัยสารสนเทศ — สถาบันฝึกอบรมด้านความมั่นคงไซเบอร์',
          targetDate: '2026-09-30', budget: 25000,
          status: 'กำลังดำเนินการ', createdDate: '2026-05-01'
        },
        {
          id: 'DP002', empId: 'E004', empName: 'นางสาวณัฐธิดา รุ่งเรือง',
          skillId: 'SK02', skillName: 'การพัฒนาระบบสารสนเทศ',
          method: 'หลักสูตรพัฒนาระบบสารสนเทศแบบครบวงจร (ออนไลน์) + ฝึกปฏิบัติในโครงการจริง',
          targetDate: '2026-12-31', budget: 15000,
          status: 'รออนุมัติ', createdDate: '2026-05-03'
        }
      ],

      // D6 แผนอัตรากำลังและคำขอต่าง ๆ
      requests: [
        {
          id: 'REQ-001', dept: 'กองเทคโนโลยีสารสนเทศ', deptCode: 'IT',
          type: 'ขอเพิ่มอัตรากำลัง',
          reason: 'ภาระงานเพิ่มขึ้น 33% จากโครงการพัฒนาระบบบริหารมหาวิทยาลัย — ต้องการนักพัฒนาระบบสารสนเทศ 2 อัตรา',
          positions: 2, status: 'รออนุมัติ', date: '2026-05-02',
          submitter: 'นายวีระพงศ์ ตันติวิทยา'
        },
        {
          id: 'REQ-002', dept: 'กองบริหารทรัพยากรบุคคล', deptCode: 'HR',
          type: 'แผนพัฒนาทักษะ',
          reason: 'จัดอบรมระบบสารสนเทศบริหารงานบุคคล (HRMIS) รุ่นที่ 1 — ผู้เข้าอบรม 5 คน',
          positions: 0, status: 'อนุมัติแล้ว', date: '2026-04-10',
          submitter: 'นางสาวจันทิมา อ่อนละมุน',
          approvedBy: 'ผู้อำนวยการกองบริหารทรัพยากรบุคคล', approvedDate: '2026-04-15'
        }
      ]
    };

    localStorage.setItem('m4_data', JSON.stringify(defaultData));
    localStorage.setItem('m4_initialized_v5', 'true');
  },

  get(table) {
    const data = JSON.parse(localStorage.getItem('m4_data')) || {};
    return data[table] || [];
  },

  set(table, value) {
    const data = JSON.parse(localStorage.getItem('m4_data')) || {};
    data[table] = value;
    localStorage.setItem('m4_data', JSON.stringify(data));
  },

  insert(table, item) {
    const items = this.get(table);
    items.push(item);
    this.set(table, items);
    return item;
  },

  update(table, idField, idValue, updates) {
    const items = this.get(table);
    const index = items.findIndex(item => item[idField] === idValue);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.set(table, items);
      return items[index];
    }
    return null;
  },

  delete(table, idField, idValue) {
    const items = this.get(table);
    const filtered = items.filter(item => item[idField] !== idValue);
    this.set(table, filtered);
  }
};