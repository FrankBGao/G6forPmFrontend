import React from 'react';
import { Menu, Icon } from 'antd';
import 'antd/es/menu/style/css';

const { SubMenu } = Menu;

const NodeContextMenu = ({ x = -300, y = 0 }) => {
  return (
    <Menu style={{ width: 256, position: 'absolute', left: x, top: y }} mode="vertical">
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="share-alt" />
            <span>CVE</span>
          </span>
        }
      >
        <Menu.Item key="s">充分</Menu.Item>
        <Menu.Item key="n">必要</Menu.Item>
        {/*<Menu.ItemGroup title="Iteom 2">*/}
        {/*<Menu.Item key="3">Option 3</Menu.Item>*/}
        {/*<Menu.Item key="4">Option 4</Menu.Item>*/}
        {/*</Menu.ItemGroup>*/}
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="question" />
            <span>查询</span>
          </span>
        }
      >
        <Menu.Item key="cm">因果模型</Menu.Item>
        <Menu.Item key="variant">变体</Menu.Item>
        {/*<SubMenu key="sub3" title="Submenu">*/}
        {/*<Menu.Item key="7">Option 7</Menu.Item>*/}
        {/*<Menu.Item key="8">Option 8</Menu.Item>*/}
        {/*</SubMenu>*/}
      </SubMenu>
      {/*<SubMenu*/}
      {/*key="sub4"*/}
      {/*title={*/}
      {/*<span>*/}
      {/*<Icon type="setting" />*/}
      {/*<span>Navigation Three</span>*/}
      {/*</span>*/}
      {/*}*/}
      {/*>*/}
      {/*<Menu.Item key="9">Option 9</Menu.Item>*/}
      {/*<Menu.Item key="10">Option 10</Menu.Item>*/}
      {/*<Menu.Item key="11">Option 11</Menu.Item>*/}
      {/*<Menu.Item key="12">Option 12</Menu.Item>*/}
      {/*</SubMenu>*/}
    </Menu>
  );
};

export default NodeContextMenu;
