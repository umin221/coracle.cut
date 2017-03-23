# coracle.cut

Scaffold a project in 1 minute

Some command maybe need authority, please use `sudo`.

## Install

```bash
npm install -g yo generator-cut
```

## Usage

### 1. Create the project directory


```bash
mkdir app
cd app
```

### 2. Run the generator

```bash
yo coracle
```

Be patient.. this may take a few minutes.
If throw some Error when install npm package,you can do it by yourself:

```bash
npm install
```

### 3. config

write config.js for your project

### 4. publish your module to xSimple

```bash
npm start
```

use `up` or `down` move,`space` to select,`enter` to commit.


## warning

Every module should have a `.js`,`.html`,`.css`,`.less` file.Otherwise `gulp build` will not make a folder for this module.Then `gulp upload` will throw a error.

## License

MIT



＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝中文文档＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
# Coracle generator

一分钟构建项目

一些命令可能需要权限请使用`sudo`.

##  安装指令

```bash
npm install -g yo generator-cut
```

## 用户操作
### 创建一个目录
指令

```bash
mkdir app
cd app
```

### 运行自定义yeoman模板
指令

```bash
yo coracle
```

需要一点时间等待安装成功！
如果安装npm依赖包时报错，你可以自己手动安装

```bash
npm install
```

### 3. 配置

config.js 为项目的配置文件

### 4. 编译并发布应用到xSimple
指令

```bash
gulp build
```
键盘上下选择模块 按空格表示是否选中 回车提交上传。

## 温馨提醒

每个模块中必须至少包含一个html，css，less，或者js 文件，否则`gulp build` 会生成一个空目录，`gulp upload`会报错。
请按顺序操作 `gulp build` 先构建 才能使用 `gulp upload` 否则上传会找不到文件报错！

## 协议

MIT
