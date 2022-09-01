## @liangshen/alfred-youdao

*Alfred工作流，使用有道词典去翻译文本*
*An Alfred workflow uses Youdao for translation*

### 运行环境

* Nodejs 14.x.x
* Alfred Powerpack

### 安装

```
npm i -g @liangshen/alfred-youdao
```

### 使用方法

可使用 option + Y 快捷键调出本工作流搜索框(或者调出alfred搜索框输入关键字 youdao)

![](./docs/youdaodict.png)

然后输入想要翻译的内容, 可以是中文和英文(中英互译) 
![](./docs/youdaodict3.png)

* 回车可以复制选中的翻译内容
* 按住command键 可以查看驼峰式命名法命名，再敲回车复制命名
  ![](./docs/youdaodict4.png)
* 按住option键 可以查看帕斯卡命名法/大驼峰式命名法命名，再敲回车复制命名
  ![](./docs/youdaodict5.png)
* 按住ctrl键 可以查看下划线命名法命名，再敲回车复制命名
  ![](./docs/youdaodict6.png)
* 按住fn键 可以查看中划线命名法命名，再敲回车复制命名
  ![](./docs/youdaodict7.png)
* 按住shift键 可以查看全大写下划线命名法/常量命名，再敲回车复制命名
  ![](./docs/youdaodict8.png)
