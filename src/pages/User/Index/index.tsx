import '@umijs/max';
import {Button, Card, List} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {listOnlineInterfaceInfoVoByPageUsingPost} from "@/services/miApi/interfaceInfoController";


const InterfaceList: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  const [interfaceList, setInterfaceList] = useState<API.InterfaceInfoVO[]>([]);
  const [current,setCurrent] = useState<number>(1);
  const searchParam = useRef({
    current: 1,
    pageSize: 10,
  });
  const  loadData = async (current: number,pageSize:number) =>{
    const res = await listOnlineInterfaceInfoVoByPageUsingPost({
      current:current,
      pageSize: pageSize,
    });

    if (res.code === 0){
      setInterfaceList(res.data?.records ?? []);
      setCurrent(res.current);
    }

  }
  useEffect( ()=>{
    console.log(searchParam);
    loadData(1,10);
  },[searchParam])
  return (
    <div>
      <div><h2>MI API 开放接口</h2></div>

      <List
        itemLayout="horizontal"
        dataSource={interfaceList}
        renderItem={(item, index) => (
          <Card style={{marginBottom: 10}}>
            <List.Item extra={<Button href={`/index/InterfaceInfo/${item.id}`}>查看接口详情</Button>}>
              <List.Item.Meta
                title={<a href={`/index/InterfaceInfo/${item.id}`} >{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          </Card>
        )}
      />
    </div>
  );

};
export default InterfaceList;
