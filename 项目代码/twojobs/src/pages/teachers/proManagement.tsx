import React, { FC, useEffect, useState } from 'react';
import { GetListDairnItem } from '@/service/index';
import {
  Imohu,
  ISkilldairnObj,
  ISkillListQuery,
  IStationVersionList,
} from '@/utils/interface';
import {
  EyeOutlined,
  RollbackOutlined,
  FormOutlined,
  DeleteOutlined,
  DeliveredProcedureOutlined,
  SendOutlined,
} from '@ant-design/icons';
import './proManagement.css';
import { Input, Space, Button, Table } from 'antd';
import style from './postless.less';
import { observer } from 'mobx-react-lite';
import useStore from '@/context/useStore';
import { history,Link } from 'umi';
import proSkill from '@/store/modules/proSkill';

const { Search } = Input;

const Postskill: FC = (props) => {
  //实训类型
  const dairn = ['全部', '生产实训', '教学实训', '专业群实训'];
  //状态
  const status = ['全部', '草稿', '已发布', '待审核', '已驳回'];

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'proname',
      //   align:"center"
    },
    {
      title: '版本',
      dataIndex: 'version',
      //   align:"center"
    },
    {
      title: '任务数量',
      dataIndex: 'taskCount',
      // align:"center"
    },
    {
      title: '所属专业',
      dataIndex: 'trade',
      //   align:"center"
    },
    {
      title: '所属行业',
      dataIndex: 'major',
      // align:"center"
    },
    {
      title: '实训类型',
      render: (row: Imohu) => {
        if (row.sxtype === '3') {
          return '专业群实训';
        } else if (row.sxtype === '1') {
          return '生产实训';
        } else if (row.sxtype === '2') {
          return '教学实训';
        }
      },
    },
    {
      title: '推荐完成天数',
      dataIndex: 'subjecttime',
      // align:"center"
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      // align:"center"
    },
    {
      title: '演示',
      render: () => {
        return '查看';
      },
      // align:"center"
    },
    {
      title: '状态',
      render: (row: Imohu) => {
        if (row.status === '2') {
          return (
            <span className={style[`status${row.status}`]}>
              {status[Number(row.status)]}
            </span>
          );
        } else if (row.status === '3') {
          return (
            <span className={style[`status${row.status}`]}>
              {status[Number(row.status)]}
            </span>
          );
        } else {
          return (
            <span className={style[`status${1}`]}>
              {status[Number(row.status)]}
            </span>
          );
        }
      },
    },
    {
      title: '操作',
      render: (row: Imohu) => {
        if (row.status === '3') {
          return (
            <div className={style.action}>
              <EyeOutlined style={{ color: '#679cf6' }} />
              <RollbackOutlined style={{ color: '#679cf6' }} />
            </div>
          );
        } else if (row.status === '1') {
          return (
            <div className={style.action}>
             <Link to={`/teachers/addProject?versionId=${row.versionId}&proId=${row.id}&see=false`}> <FormOutlined style={{ color: '#679cf6' }}/></Link>
              <SendOutlined style={{ color: '#679cf6' }} />
              <DeleteOutlined
                style={{ color: '#679cf6' }}
                onClick={() => del(row.versionId as string)}
              />
            </div>
          );
        } else if (row.status === '2') {
          return (
            <div className={style.action}>
              <EyeOutlined style={{ color: '#679cf6' }} />
            </div>
          );
        }
      },
    },
  ];
  //专业状态
  //const [toplist, setList] = useState<ISkillLabel[]>([])

  // const [topitem, settopitem] = useState<ISkillListQuery[]>([])

  //专业每一项高亮
  const [curStatus, setcurStatus] = useState('');
  //行业每一行的高亮
  const [industry, setIndustry] = useState('');
  //实训类型高亮
  const [curDairn, setcurDairn] = useState(0);
  //状态每一项高亮
  const [carStatus, setcarStatus] = useState(0);

  //头部每一项状态
  // const [dataSource, setdataSource] = useState<ISkillListQuery[]>([]);

  //搜索
  const [searchTitle, setsearchTitle] = useState('');

  //仅看我的
  const [isMyInfo, setisMyInfo] = useState(false);

  let queryParams: Imohu = {
    isAsc: 'desc',
    pageNum: 1,
    pageSize: 10,
    sxtype: 0,
    status: 0,
    proName: '',
    newProjectList: 0,
  };
  let { proSkill, skill } = useStore();
  //详情
  //删除
  function del(versionId: string) {
    proSkill.DelItem(versionId).then((res) => {
      if (res.code === 200) {
        alert(res.msg);
        proSkill.GetListDairnItem(queryParams);
      }
    });
  }
  //修改
  // function update(versionId: string){
      
  // }
  //头部发起请求
  useEffect(() => {
    proSkill.Gettoplist1();
    proSkill.Gettoplist2();
  }, []);
  useEffect(() => {
    proSkill.GetListDairnItem(queryParams);
  }, []);
  //表格发起请求
  useEffect(() => {
    if (carStatus) {
      queryParams = {
        ...queryParams,
        specialtyTag: curStatus,
        industryTag: industry,
        sxtype: curDairn,
        status: carStatus,
        proName: searchTitle,
        newProjectList: isMyInfo ? 1 : 0,
      };
    } else {
      queryParams = {
        ...queryParams,
        specialtyTag: curStatus,
        industryTag: industry,
        sxtype: curDairn,
        status: carStatus,
        proName: searchTitle,
        newProjectList: isMyInfo ? 1 : 0,
      };
    }
    proSkill.GetListDairnItem(queryParams);
  }, [curStatus, carStatus, searchTitle, isMyInfo, curDairn, industry]);
  console.log(proSkill.setdataSource);

  return (
    <div className="box">

      <div className="topfather">
        <div className="dairn">
          <b>实训类型:</b>
          {dairn.map((item, index) => {
            return (
              <span
                key={index}
                className={index === curDairn ? 'active' : ''}
                onClick={(e) => setcurDairn(index)}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className="top">
          <b>专业:</b>
          {[{ label: '全部', value: '' }, ...proSkill.toplist2].map((item) => {
            return (
              <span
                key={item.value}
                className={item.value == curStatus ? 'active' : ''}
                onClick={(e) => setcurStatus(item.value)}
              >
                {item.label}
              </span>
            );
          })}
        </div>
        <div className="top1">
          <b>行业:</b>
          {[{ label: '全部', value: '' }, ...proSkill.toplist1].map((item) => {
            return (
              <span
                key={item.value}
                className={item.value === industry ? 'active' : ''}
                onClick={(e) => setIndustry(item.value)}
              >
                {item.label}
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
      <div
        className="search"
        style={{
          width: '100%',
          margin: '0 auto',
          height: '70px',
          // padding: '0 100px',
          marginTop:"20px"
        }}
      >
        <div className="search-son">
          <input
            type="checkbox"
            onChange={(e) => setisMyInfo(e.target.checked)}
          />
          <span>仅看最新版</span>
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
              history.replace('/teachers/addProject?see=false');
            }}
          >
            +添加项目
          </Button>
        </div>
      </div>
      <div className="tab">
        <Table
          dataSource={proSkill.setdataSource}
          columns={columns}
          rowKey="versionId"
          style={{ width: '100%' }}
        ></Table>
      </div>
    </div>
  );
};
export default observer(Postskill);
