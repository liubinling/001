import React from 'react';
import { Link } from 'epm-ui-boot/router';
import { Wrapper } from '../components/index'

export default ( props ) => (
  <Wrapper>
    <div>
      { props.children }
      <hr />
      <h3>目录</h3>
      <ul>
        <li><Link to="/sysconfig">系统配置</Link></li>
        <li><Link to="/platform-monitor">平台监控</Link></li>
        <li>基础信息管理部分</li>
        <ul>
          <li><Link to="/info/transfirmMan">运输公司信息管理</Link></li>
          <li><Link to="/info/motorcadeMan">车队信息管理</Link></li>
          <li><Link to="/info/areaMan">地域信息管理</Link></li>
          <li><Link to="/info/insuranceCompanyMan">保险公司信息管理</Link></li>
          <li><Link to="/info/driverMan">驾驶人公司信息管理</Link></li>
          <li><Link to="/info/vehicleMan">车辆信息管理</Link></li>
          <li><Link to="/info/deviceMan">采集终端信息管理</Link></li>
        </ul>
      </ul>
    </div>
  </Wrapper>
);