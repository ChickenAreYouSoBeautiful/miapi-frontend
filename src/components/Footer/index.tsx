import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Mi API开放平台',
          title: 'Mi API开放平台',
          href: 'http://120.46.54.54/',
          blankTarget: true,
        },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/ant-design/ant-design-pro',
        //   blankTarget: true,
        // },
        {
          key: 'document',
          title: '如何使用',
          href: 'http://120.46.54.54/api%E5%BC%80%E6%94%BE%E6%96%87%E6%A1%A3%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E/',
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
