<h1 align="center">API Documentation</h1>

## HTTP Status Code

```json
{
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  resetContent: 205,

  resNotFound: 294,
  alreadyExist: 295,
  resOccupied: 296,
  captchaErr: 297,
  passwdMismatch: 298,
  parseErr: 299,

  badReq: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  unsupportedType: 415,
  locked: 423,
  tooManyReq: 429,
  loginTimeOut: 440,
  illegal: 451,

  internalSrvErr: 500,
  notImplemented: 501
}
```



## 约定

​	`username` 必须为电子邮件

​	`nickname` 可以重复

​	一般 API 通用返回状态码：

- unauthorized

    访问普通 API 表示未登录

    访问管理员 API 表示权限不足

- forbidden

    未知错误

## 公钥

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm5LkWoglzNvsAdf3XYZG
peaYpl58EXFPuGxEtIlV9B8/wJDUyCurReAazLPceBdgE9GiowBE7IyuehX63e4Y
lMgnjHhyrGeAcLXjAdCWGkPWZvlHAR2/7LvLlPssOw7XQFzXJIYeXYiDiDQbFIoZ
QuQ+FdCfFC2WKCt8CtTW33T1OMQXX10cZ4N2LqEADl1WPsRkUePI7DsNp2UNtQ70
dSyBx9mwbTPx+nQeR8+8pFIFlYf1hUZ3WMNqZIOGw0PoPOXMxz8m2M0Fb/gjKSmI
X7BpRH0UtMmb0wDWwUXvJv0GPjdjGd4VSy1BLEcL+X6RqxJ54OGcBMBQLmKJyoBq
kwIDAQAB
-----END PUBLIC KEY-----
```

## POST /signup

```http
POST /signup
```

​	用户注册

​	依赖 Cookie

​	需要事先调用 `POST /email` 获取验证码

​	密码使用公钥加密


### Request

```json
{ 
  "username": "admin@transcliff.top",
  "nickname": "admin", 
  "password": "CR1w5dtveyYZplzdGbYiSx6XsROgZ3TZFXzojfHnQKx3q0MXnLRRem+5fWIpBc1fLBN4vpGXfWRxMDioXw6ilFPeq39LQczaUnAqCrHgFWbLzNieLjf667RN6AUBvzfnb/iaa8vXVvI6612iBu/LrgaczwDXBrdcOII58YOzgmhUHBT4q2RTryaPW4MtSFIbumXkzDT1DofdpGBo3Lf4yM2e8nJUWAgZWgzrve6grZdDDM2ev60lC51po3gLxxYOxHW6hG94eIfTpV9MZPSxJU534TH/SGN/HyZVpPGDUOKEPx7vJ46RPRCWMRluTeN5EzHsu6NgimwIQXjb+GTMbg==" 
}
```

### Response

- captchaErr

    验证码错误

- parseErr

    密码加密错误

- resOccupied

    用户已存在

- ok

    注册成功

    返回：

```json
{ 
  "uid": 0, 
  "gid": 0, 
  "username": "admin@transcliff.top", 
  "nickname": "admin"
}
```

## POST /login

```http
POST /login
```

​	用户登录

​	密码使用公钥加密

​	依赖 Cookie

### Request

​	如果已登录，则忽略参数，直接返回登录成功。

```json
{ 
  "username": "admin@transcliff.top",
  "password": "CR1w5dtveyYZplzdGbYiSx6XsROgZ3TZFXzojfHnQKx3q0MXnLRRem+5fWIpBc1fLBN4vpGXfWRxMDioXw6ilFPeq39LQczaUnAqCrHgFWbLzNieLjf667RN6AUBvzfnb/iaa8vXVvI6612iBu/LrgaczwDXBrdcOII58YOzgmhUHBT4q2RTryaPW4MtSFIbumXkzDT1DofdpGBo3Lf4yM2e8nJUWAgZWgzrve6grZdDDM2ev60lC51po3gLxxYOxHW6hG94eIfTpV9MZPSxJU534TH/SGN/HyZVpPGDUOKEPx7vJ46RPRCWMRluTeN5EzHsu6NgimwIQXjb+GTMbg==" 
}
```

### Response

- parseErr

    密码加密错误

- resNotFound

    用户不存在

- passwdMismatch

    密码错误

- ok

    登录成功

    返回：

```json
{ 
  "uid": 0, 
  "gid": 0, 
  "username": "admin@transcliff.top", 
  "nickname": "admin"
}
```


## POST /logout

```http
POST /logout
```

​	用户退出登录

​	依赖 Cookie

### Request

​	无参数

### Response

- ok

    退出登录成功


## POST /email

```http
POST /email
```

​	发送验证码邮件

​	依赖 Cookie

### Request

```json
{
  "email": "admin@transcliff.top"
}
```



### Response



- parseErr

    邮箱格式错误

- ok

    邮件发送成功

- forbidden

    邮件发送失败或其它未知错误

## GET /user

```http
GET /user
```

​	查询当前登录用户信息

​	依赖 Cookie



### Request

​	无参数

### Response

- ok

    用户已登录

    返回：

```json
{ 
  "uid": 0, 
  "gid": 0, 
  "username": "admin@transcliff.top", 
  "nickname": "admin"
}
```

## GET /user/:uid(\\\\d+)

```http
GET /user/:uid(\\d+)
```

​	查询指定用户档案

### Request

​	`uid` 必须为纯数字

```http
uid
```

### Response

- ok

    找到用户

    此处使用 `email` 属性

    `gid` 表示账户权限

    `status` 与账户禁用等状态有关

    返回：

```json
{ 
  "uid": 0, 
  "gid": 0, 
  "email": "admin@transcliff.top", 
  "nickname": "admin",
  "signupTime": "2023-05-31T10:13:09.000Z",
  "status": 0
}
```

## PATCH /reset/password

```http
PATCH /reset/password
```

​	修改密码，并刷新 Cookie

​	需要事先调用 `POST /email` 获取验证码

​	密码使用公钥加密

​	依赖 Cookie

### Request

```json
{ 
  "username": "admin@transcliff.top",
  "password": "CR1w5dtveyYZplzdGbYiSx6XsROgZ3TZFXzojfHnQKx3q0MXnLRRem+5fWIpBc1fLBN4vpGXfWRxMDioXw6ilFPeq39LQczaUnAqCrHgFWbLzNieLjf667RN6AUBvzfnb/iaa8vXVvI6612iBu/LrgaczwDXBrdcOII58YOzgmhUHBT4q2RTryaPW4MtSFIbumXkzDT1DofdpGBo3Lf4yM2e8nJUWAgZWgzrve6grZdDDM2ev60lC51po3gLxxYOxHW6hG94eIfTpV9MZPSxJU534TH/SGN/HyZVpPGDUOKEPx7vJ46RPRCWMRluTeN5EzHsu6NgimwIQXjb+GTMbg==" 
}
```

### Response

- captchaErr

    验证码错误

- parseErr

    密码加密错误

- resNotFound

    用户不存在

- ok

    修改密码成功

    返回：

```json
{ 
  "uid": 0, 
  "gid": 0, 
  "username": "admin@transcliff.top", 
  "nickname": "admin"
}
```

## PATCH /reset/nickname

```http
PATCH /reset/nickname
```

​	修改密码，并刷新 Cookie

​	依赖 Cookie

### Request

```json
{
  "nickname": "admin"
}
```



### Response

- ok

    昵称修改成功

    返回：

```json
{ 
  "uid": 0, 
  "gid": 0, 
  "username": "admin@transcliff.top", 
  "nickname": "admin"
}
```

