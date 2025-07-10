import '@umijs/max';
import React, {useEffect, useState} from 'react';
import EChartsReact from "echarts-for-react";
import {Card, Divider, Form, message, Select} from "antd";
import {analyseUsingGet} from "@/services/api-interfaces/userInterfaceCountController";


const Analyse: React.FC = () => {

  const [optionData, setOptionData] = useState({});
  const [loadingOption, setLoadingOption] = useState<boolean>(false);


  const loadData = async (num: number) => {
    try {
      setLoadingOption(true);
      const res = await analyseUsingGet({
        number: num ?? 3
      });
      if (res.code === 0) {
        const userInterfaceCountVoS = res.data?.userInterfaceCountVoS ?? [];
        const echartsData = userInterfaceCountVoS.map((item) => {
          return {
            value: item.count,
            name: item.name
          }
        })
        const option = {
          title: {
            text: '接口调用统计(最多统计前十条)',
            subtext: '接口总数：' + res.data?.total,
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'analyse Form',
              type: 'pie',
              radius: '50%',
              data: echartsData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        setOptionData(option);
      } else {
        message.error("请求失败:" + res.message)
      }
    } catch (e: any) {
      message.error("请求失败：" + e.message);
    } finally {
      setLoadingOption(false);
    }
  }

  const handleChange = (value: number) => {
    console.log(value);
    loadData(value);
  }

  useEffect(() => {
    loadData(3);
  }, [])


  return (
    <div>
      <Card>
        <Form>
          <Form.Item
          label={'展示接口数量'}
          >
          <Select
            defaultValue={3}
            style={{width: 120}}
            onChange={handleChange}
            options={[
              {value: 1, label: '1'},
              {value: 2, label: '2'},
              {value: 3, label: '3'},
              {value: 4, label: '4'},
              {value: 5, label: '5'},
              {value: 6, label: '6'},
              {value: 7, label: '7'},
              {value: 8, label: '8'},
              {value: 9, label: '9'},
              {value: 10, label: '10'},
            ]}
          />
          </Form.Item>
        </Form>

        <Divider/>
        <EChartsReact loadingOption={loadingOption} option={optionData}/>
      </Card>
    </div>
  )
};
export default Analyse;
