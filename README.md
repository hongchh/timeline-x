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

## 界面构成
* 整个应用分成2个主要界面：【主界面】，【权限界面】
* 【权限界面】用于用户登录，也是应用的启动界面
* 【主界面】包含3个子界面：【管理】，【轴线图】，【轮播图】
* 【轴线图】和【轮播图】用于时光展示
* 【管理】用于展示数据分析结果以及编辑时光记录（添加/修改）

## 界面跳转关系
* 【权限界面】验证成功之后跳转到【主界面】
* 【主界面】默认展示【管理】界面
* 【主界面】顶栏可以选择跳转到【管理】、【轴线图】或【轮播图】界面
* 【主界面】顶栏选择“锁屏”之后回到【权限界面】

## Vue组件划分
```txt
└─App：挂载整个应用
   ├─Auth：【权限界面】
   │  └─StarFlow：【权限界面】底部的动画
   └─Main：【主界面】的基本结构
      ├─Management：【管理】
      │     ├─TimeAnalysisPerMonth：月份时间分析组件
      │     ├─TimeAnalysisPerYear：年份时间分析组件
      │     ├─TimeAnalysisByType：分类时间分析组件
      │     └─EditTimeRecord：时间记录编辑组件
      ├─Timeline：【轴线图】
      └─TimeSlide：【轮播图】
```