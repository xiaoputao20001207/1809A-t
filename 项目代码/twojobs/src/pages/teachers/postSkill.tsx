import React, { FC, useEffect, useState } from 'react';
import { GetListItem, delSkill, updateSkill, upretSkill } from '@/service/index';
import { ISkillListQuery, IStationVersionList } from '@/utils/interface';
import {
  EyeOutlined,
  RollbackOutlined,
  FormOutlined,
  DeleteOutlined,
  DeliveredProcedureOutlined,
  SendOutlined,
} from '@ant-design/icons';
import './postSKill.css';
import { Input, Space, Button, Table } from 'antd';
import style from './postless.less';
import { observer } from 'mobx-react-lite';
import useStore from '@/context/useStore';
import { history, Link } from 'umi';
import skill from '@/store/modules/skill';

const { Search } = Input;

const status = ['全部', '草稿', '已发布', '待审核', '已驳回'];

const Postskill: FC = (props) => {
  const columns = [
    {
      title: '岗位名称',
      dataIndex: 'name',
      //   align:"center"
    },
    {
      title: '专业',
      dataIndex: 'majorName',
      //   align:"center"
    },
    {
      title: '版本号',
      dataIndex: 'stationVersion',
      //   align:"center"
    },
    {
      title: '技能数量',
      dataIndex: 'skillNum',
      // align:"center"
    },
    {
      title: '作者',
      dataIndex: 'userName',
      // align:"center"
    },
    {
      title: '发起时间',
      dataIndex: 'createTime',
      // align:"center"
    },
    {
      title: '状态',
      render: (row: IStationVersionList) => (
        <span className={style[`status${row.status}`]}>
          {status[Number(row.status)]}
        </span>
      ),
    },
    {
      title: '操作',
      render: (row: IStationVersionList) => {
        if (row.status === '3') {
          return (
            <div className={style.action}>
              <EyeOutlined style={{ color: '#679cf6' }} />
              <RollbackOutlined style={{ color: '#679cf6' }} 
                onClick={()=>retSkill(row.stationVersionId,row.status)}
              />
            </div>
          );
        } else if (row.status === '1') {
          return (
            <div className={style.action}>
              <Link
                to={`/teachers/addPostSkill?stationVersionId=${row.stationVersionId}&see=false`}
              >
                <FormOutlined style={{ color: '#679cf6' }} />
              </Link>
              <SendOutlined
                style={{ color: '#679cf6' }}
                onClick={() => statusSkill(row.stationVersionId, row.status)}
              />
              <DeleteOutlined
                style={{ color: '#679cf6' }}
                onClick={() => del(row.stationVersionId)}
              />
            </div>
          );
        }
      },
    },
  ];

  //专业每一项高亮
  const [curStatus, setcurStatus] = useState('');

  //状态每一项高亮
  const [carStatus, setcarStatus] = useState(0);

  //头部每一项状态
  const [dataSource, setdataSource] = useState<ISkillListQuery[]>([]);

  //搜索
  const [searchTitle, setsearchTitle] = useState('');

  //仅看我的
  const [isMyInfo, setisMyInfo] = useState(false);

  let queryParams: ISkillListQuery = {
    isAsc: 'desc',
    searchTitle: '',
    pageNum: 1,
    pageSize: 10,
    isMyInfo: false,
  };
  let { skill } = useStore();

  //头部发起请求
  useEffect(() => {
    skill.Gettoplist();
  }, []);

  //表格发起请求
  useEffect(() => {
    if (carStatus) {
      queryParams = {
        ...queryParams,
        majorId: curStatus,
        status: carStatus,
        searchTitle,
        isMyInfo,
      };
    } else {
      queryParams = {
        ...queryParams,
        majorId: curStatus,
        status: '' as unknown as number,
        searchTitle,
        isMyInfo,
      };
    }
    skill.GetListItem(queryParams);
  }, [curStatus, carStatus, searchTitle, isMyInfo]);

  //删除
  function del(stationVersionId: string) {
    delSkill(stationVersionId).then((res) => {
      if (res.code === 200) {
        alert(res.msg);
        skill.GetListItem(queryParams);
      }
    });
  }

  //修改状态
  function statusSkill(stationVersionId: string, status: string) {
    updateSkill(stationVersionId, status).then((res) => {
      if (res.code === 200) {
        alert(res.msg);
        skill.GetListItem(queryParams);
      }
    });
  }
//返回
function retSkill(stationVersionId:string,status:string){
    upretSkill(stationVersionId,status).then((res)=>{
      if(res.code===200){
          alert(res.msg)
        skill.GetListItem(queryParams);
      }
    })
}
  return (
    <div className="box" style={{padding:'0 60px'}}>
      <div className="topfather" >
        <div className="top">
          <b>专业:</b>
          {[{ name: '全部', id: '' }, ...skill.toplist].map((item) => {
            return (
              <span
                key={item.id}
                className={item.id === curStatus ? 'active' : ''}
                onClick={(e) => setcurStatus(item.id)}
              >
                {item.name}
              </span>
            );
          })}
        </div>
        <div className="topc">
          <b>状态:</b>
          {status.map((item, index) => {
            return (
              <span
                key={index}
                className={index === carStatus ? 'active' : ''}
                onClick={(e) => setcarStatus(index)}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className="search" style={{width:'95%',marginLeft:"30px"}}>
        <div className="search-son">
          <input
            type="checkbox"
            onChange={(e) => setisMyInfo(e.target.checked)}
          />
          <span>仅看我的</span>
          <Space direction="vertical">
            <Search
              placeholder="搜索岗位"
              onSearch={(value) => setsearchTitle(value)}
              style={{ width: 200 }}
            />
          </Space>
          <Button
            type="primary"
            onClick={() => {
              history.replace('/teachers/addPostSkill');
            }}
          >
            +添加岗位
          </Button>
        </div>
      </div>
      <div className="tab" >
        <Table
          dataSource={skill.setdataSource}
          columns={columns}
          rowKey="stationId"
          style={{width:'95%'}}
        ></Table>
      </div>
    </div>
  );
};
export default observer(Postskill);

