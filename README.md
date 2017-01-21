# timeline-x

> A Simple Timeline Application

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 基本需求分析
## 添加时光轴条目
* 添加每一天的时间记录
* 分类，每天的记录可以有多个项，每个项目有对应的时间

```txt
2016-01-20，星期五
1. 学习Vue, 5h，[学习]
2. 跑步，0.5h，[运动]
3. 看霹雳布袋戏，2h，[休闲]
```

## 数据分析
* 按照月份统计每一天的时间支出
* 按照分类统计各项内容的时间支出
* 可以按照年月查看时间支出的变化情况
* 可以按照分类查看时间支出的变化情况
* 按照时间支出统计各分类的比重
* 按照月份展示一年之内每个月的时间支出
* 按照年份展示近几年的时间支出

## 时光展示
* 时光轴形式进行展示
* 轮播图形式进行展示

## 数据模型
```json
{
  "items": [{
    "content": "string",
    "time": "number",
    "type": "string"
  }],
  "year": "number",
  "month": "number",
  "date": "number",
  "day": "string"
}
```

数据项示例
```json
{
  "items": [{
    "content": "学习Vue",
    "time": "5",
    "type": "学习"
  }, {
    "content": "跑步",
    "time": "0.5",
    "type": "运动"
  }, {
    "content": "看霹雳布袋戏",
    "time": "2",
    "type": "休闲"
  }],
  "year": "2016",
  "month": "01",
  "date": "20",
  "day": "星期五"
}
```

## 页面构想
* 整个应用分成3个界面：[时光]，[管理]，[权限]。
* [时光]界面用于展示时间，可以选择以哪种形式进行展示----时光轴/轮播图
* [管理]界面用于展示数据分析结果以及对应用进行管理（添加完善时间记录）
* [权限]界面用于用户登录，也是应用的启动界面

## 跳转关系
* [权限]界面登录成功之后跳转到[管理]界面
* [管理]界面顶栏可以选择跳转到[时光]界面
* [时光]界面顶栏可以选择跳转到[管理]界面

## 模块划分
```txt
├─auth：[权限]界面
└─app：应用主界面，包含顶栏以及子模块management和timeline
   ├─management：[管理]界面
   └─time-show：[时光]界面
         ├─timeline：时光轴展示
         └─time-slide：轮播图展示
```