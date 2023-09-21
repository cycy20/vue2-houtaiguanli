import cookie from 'js-cookie'

export default {
    state: {
        isCollapse: false, //控制菜单开关
        tabList: [

            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home',
            }
        ],
        menu: []

    },
    mutations: {
        //修改菜单的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        selectMenu(state, val) {
            //判断添加数据是不是首页
            if (val.name !== 'home') {
                const index = state.tabList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabList.push(val)
                    console.log(state.tabList, 'tablist')
                }
            }
        },
        //删除指定的tag
        closeTag(state, item) {
            console.log('closetagclosetag', item)
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index, 1)
        },
        setMenu(state, val) {
            console.log(val, 'setmenu')
            state.menu = val
            console.log(state.menu, 'state---menu')
            cookie.set('menu', JSON.stringify(val))
        },
        //注册动态路由
        addMenu(state, router) {
            console.log('addmenu')
            if (!cookie.get('menu')) return

            const menu = JSON.parse(cookie.get('menu'))
            state.menu = menu
                //组装动态路由
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () =>
                            import (`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () =>
                        import (`../views/${item.url}`)
                    menuArray.push(item)
                }

            });
            console.log(menuArray, 'menuArr')
            menuArray.forEach(item => {
                router.addRoute('main', item)
            })
        }
    }

}