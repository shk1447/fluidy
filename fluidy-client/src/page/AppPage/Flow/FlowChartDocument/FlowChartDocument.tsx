import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Process Code',
    dataIndex: 'process_code',
    sorter: {
      compare: (a: any, b: any) => a.process_code - b.process_code,
      multiple: 3,
    },
  },
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: {
      compare: (a: any, b: any) => a.code - b.code,
      multiple: 2,
    },
  },
  {
    title: 'Process Name',
    dataIndex: 'process_name',    
  },
  {
    title: 'Process Detail',
    dataIndex: 'process_detail',   
    width: "30%" 
  },
  {
    title: 'Control Code',
    dataIndex: 'control_code',    
  },
  {
    title: '계정 과목',
    dataIndex: 'category',    
  },
];

const data = [
  {
    key: '1',
    process_code: 'PU-01',
    code : '01',
    process_name : "구매요청",
    process_detail : `
    구매요구부서의 구매담당자는 구매품의서를 [Portal-전자결재]시스템을 통하여 전결규정에 의하여 전결권자자의 승인을 득하고, 예산통제 및 일상감사를 경유하여 외주구매담당 계약담당자에 전자결재로 접수한다.
    외주구매팀 계약담당자는 접수확인 하고, 구매품의서를 출력하여 보관한다.
    `,
    control_code : "PU-01-C-01",
    category : "소모품비"
  },
  {
    key: '2',
    process_code: 'PU-02',
    code : '02',
    process_name : "구매요청",
    process_detail : `
    구매요구부서의 구매담당자는 구매품의서를 [Portal-전자결재]시스템을 통하여 전결규정에 의하여 전결권자자의 승인을 득하고, 예산통제 및 일상감사를 경유하여 외주구매담당 계약담당자에 전자결재로 접수한다.
    외주구매팀 계약담당자는 접수확인 하고, 구매품의서를 출력하여 보관한다.
    `,
    control_code : "PU-01-C-01",
    category : "소모품비"
  },
  {
    key: '3',
    process_code: 'PU-03',
    code : '03',
    process_name : "구매요청",
    process_detail : `
    구매요구부서의 구매담당자는 구매품의서를 [Portal-전자결재]시스템을 통하여 전결규정에 의하여 전결권자자의 승인을 득하고, 예산통제 및 일상감사를 경유하여 외주구매담당 계약담당자에 전자결재로 접수한다.
    외주구매팀 계약담당자는 접수확인 하고, 구매품의서를 출력하여 보관한다.
    `,
    control_code : "PU-01-C-01",
    category : "소모품비"
  },
  {
    key: '4',
    process_code: 'PU-04',
    code : '04',
    process_name : "구매요청",
    process_detail : `
    구매요구부서의 구매담당자는 구매품의서를 [Portal-전자결재]시스템을 통하여 전결규정에 의하여 전결권자자의 승인을 득하고, 예산통제 및 일상감사를 경유하여 외주구매담당 계약담당자에 전자결재로 접수한다.
    외주구매팀 계약담당자는 접수확인 하고, 구매품의서를 출력하여 보관한다.
    `,
    control_code : "PU-01-C-01",
    category : "소모품비"
  }
];


const FlowChartDocument = () =>{
    function onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log('params', pagination, filters, sorter, extra);
      }
      
    return(
        <section className="el-container">                
            <main className="el-main">
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </main>   
        </section>         
    )
}
export default FlowChartDocument;