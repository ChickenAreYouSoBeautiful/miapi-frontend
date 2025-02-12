import '@umijs/max';
import {Button, Card, List} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {listInterfaceInfoVoByPageUsingPost} from "@/services/miApi/interfaceInfoController";


const InterfaceList: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  const [interfaceList, setInterfaceList] = useState<API.InterfaceInfoVO[]>([]);
  const [interfaceListCard, setInterfaceListCard] = useState<any[]>([]);
  const [current,setCurrent] = useState<number>(1);
  const searchParam = useRef({
    current: 1,
    pageSize: 10,
  });
  const  loadData = async (current: number,pageSize:number) =>{
    const res = await listInterfaceInfoVoByPageUsingPost({
      current:current,
      pageSize: pageSize,
    });

    if (res.code === 0){
      console.log(res.data.records)
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

      {/*<List*/}
      {/*  grid={{*/}
      {/*    gutter: 16,*/}
      {/*    xs: 1,*/}
      {/*    sm: 2,*/}
      {/*    md: 4,*/}
      {/*    lg: 4,*/}
      {/*    xl: 6,*/}
      {/*    xxl: 3,*/}
      {/*  }}*/}
      {/*  dataSource={data}*/}
      {/*  renderItem={(item) => (*/}
      {/*    <List.Item>*/}
      {/*      <Card title={item.title}>Card content</Card>*/}
      {/*    </List.Item>*/}
      {/*  )}*/}
      {/*/>*/}

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
