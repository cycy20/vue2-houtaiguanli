import Mock from "mockjs";
import homeApi from './mockServerData/home'
import user from './mockServerData/user'
import permission from './mockServerData/permission'
//首页数据
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData)
    //用户列表数据
Mock.mock(/api\/user\/getUser/, 'get', user.getUserList)
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock(/api\/permission\/getmenu/, 'post', permission.getMenu)