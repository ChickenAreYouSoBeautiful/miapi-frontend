import '@umijs/max';
import React, {useEffect, useState} from 'react';
import {Alert, Avatar, Button, Card, Descriptions, DescriptionsProps, Divider, Form, Input, message} from "antd";
import {getLoginUserUsingGet, refreshSecreteKeyUsingPost, signInUsingPost} from "@/services/miApi/userController";
import {DescriptionsItemType} from "antd/es/descriptions";
import {AntDesignOutlined, EditOutlined, PayCircleOutlined, WarningFilled} from "@ant-design/icons";


const InterfaceList: React.FC = () => {

  const [loadingData,setLoadingData] = useState<boolean>(false);
  const [loadingSignIn,setLoadingSignIn] = useState<boolean>(false);
  const [userInfo,setUserInfo] = useState<API.LoginUserVO>({});
  const [userInfoDescription,setUserInfoDescription] = useState<DescriptionsItemType[]>();

  const onSetUserInfoDescription = (userInfo: API.LoginUserVO)=>{
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名称',
      children: userInfo.userName,
    },
    {
      key: '2',
      label: '用户账号',
      children: userInfo.userAccount,
    },
    {
      key: '3',
      label: '用户头像',
      children:    <Avatar
        src={ userInfo.userAvatar}
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        icon={<AntDesignOutlined />}
        alt={'图片失效'}
      />
     ,
    },
    {
      key: '4',
      label: '用户简介',
      children: userInfo.userProfile,
    },
    {
      key: '5',
      label: '我的mi币',
      children: userInfo.miCurrency,
    },
    {
      key: '6',
      label: '创建时间',
      children: userInfo.createTime,
    },
  ];
    setUserInfoDescription(items);
  }

  const loadData = async  ()=>{
    setLoadingData(true)
    try {
      const res = await getLoginUserUsingGet();
      if (res?.code === 0 ){
        const userInfo = res?.data;
        setUserInfo(userInfo)
        onSetUserInfoDescription(userInfo);
      }
    }catch (e){
      message.error(e.message);
    }
    setLoadingData(false);
  }

  const onFinish =  async () =>{
    try {
      const res = await refreshSecreteKeyUsingPost();
      if (res?.code === 0) {
        message.success("更新成功");
        await loadData();
      } else {
        message.error('更新失败' + res?.description)
      }
    } catch (e) {
      message.error("更新失败:"+e.message)
    }

  }

  const onSignIn =  async () =>{
    try {
      setLoadingSignIn(true);
      const res = await signInUsingPost();
      if (res?.code === 0) {
        message.success(res.data ?? "签到成功");
        const {data} =  await getLoginUserUsingGet();
        setUserInfo(data);
        onSetUserInfoDescription(data);
      } else {
        message.error('签到失败' + res?.description)
      }
    } catch (e) {
      message.error("签到失败:"+e.message)
    }finally {
      setLoadingSignIn(false);
    }

  }


  useEffect(()=>{
    loadData();
  },[])

  return (
    <div>

      <Card loading={loadingData}>
         <Descriptions  layout={'vertical'} title="用户信息" items={userInfoDescription ?? []}  extra={
           <EditOutlined />
         }/>
        <Divider/>
        <Alert showIcon={true} icon={<WarningFilled twoToneColor={'yellow'} />} message={" 请保护好你的ak和sk,防止泄露!"} type="warning" />
        <div style={{marginTop: 30,}}>
          <Form
            layout={'inline'}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<string>
              label="AccessKey"
              name="accessKey"
            >
              <Input readonly="readonly" bordered={false}  defaultValue={userInfo?.accessKey} type={"text"}/>
            </Form.Item>

            <Form.Item<string>
              label="SecreteKey"
              name="secreteKey"

            >
              <Input.Password readonly="readonly" defaultValue={userInfo?.secretKey} bordered={false} />
            </Form.Item>
            <Form.Item style={{marginTop:30,}}>
              <Button type="primary" htmlType="submit">
                更新SecreteKey
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Divider/>
        <Alert showIcon={true} icon={<PayCircleOutlined twoToneColor={'yellow'} />}
               message={<b>签到得mi币!</b>}
               description={<p>规则：每次签到+50，每次连续签到累计+10,最多叠加到100。普通用户最多累计1000mi币</p>}
               type="success" />
        <div style={{marginTop: 30,}}>
          <Button type="primary" loading={loadingSignIn} onClick={() => onSignIn()}>
            签到
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default InterfaceList;
