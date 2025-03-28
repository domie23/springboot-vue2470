const base = {
    get() {
        return {
            url : "http://localhost:8080/yitipeixunjigou/",
            name: "yitipeixunjigou",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/yitipeixunjigou/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "艺体培训机构业务管理系统"
        } 
    }
}
export default base
