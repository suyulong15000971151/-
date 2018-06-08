import axios from 'axios';

//let base = '/api';
let base = 'http://47.52.250.141:8882';
let base1 = 'http://47.52.250.141:8883';
//let base = 'http://121.196.206.199:8882';
//let base1 = 'http://121.196.206.199:8883';
//（用户管理模块）
//根据条件选择用户(后台)
export const getuserList = params => { return axios.post(`${base}/appUser/appuser/usersByParams?access_token=${params.access_token}`, params ); };
export const getuserLog = params => { return axios.post(`${base}/appUser/appuser/loginlogs?access_token=${params.access_token}`, params ); };
//批量禁用或启用会员
export const setmembsta = params => { return axios.post(`${base}/appUser/appuser/editmemberstatus?access_token=${params.access_token}`, params ); };
export const setfitsta = params => { return axios.post(`${base}/appUser/appuser/editrechargestatus?access_token=${params.access_token}`, params ); };
export const setcashsta = params => { return axios.post(`${base}/appUser/appuser/editwithdrawstatus?access_token=${params.access_token}`, params ); };
export const realnamesta = params => { return axios.post(`${base}/appUser/appuser/editrealnamestatus?access_token=${params.access_token}`, params ); };
export const agentchange = params => { return axios.post(`${base}/appUser/appuser/editagentstatus?access_token=${params.access_token}`, params ); };
export const gradechange = params => { return axios.post(`${base}/appUser/appuser/editmemberlevel?access_token=${params.access_token}`, params ); };

export const editMember = params => { return axios.post(`${base}/appUser/appuser/updateuserinfo?access_token=${params.access_token}`, params ); };
export const getCashaddress = params => { return axios.post(`${base}/appUser/appuser/useraddress?access_token=${params.access_token}`, params ); };

export const getBankcards = params => { return axios.post(`${base}/appUser/appuser/bankcardlist?access_token=${params.access_token}`, params ); };
export const getContactbook = params => { return axios.post(`${base}/chat/chat/selectListBigAppMmailList?access_token=${params.access_token}`, params ); };
export const getUserfund = params => { return axios.get(`${base}/token/bigToken/bigAppAddressVOListSelect?bauId=${params.id}&access_token=${params.access_token}`); };
//发送短信
export const sendMessage = params => { return axios.post(`${base}/adminUser/adminuser/sendmessage?access_token=${params.access_token}`, params ); };
//token下拉列表
export const getTokenlist = params => { return axios.get(`${base}/token/bigToken/tokenNameId?access_token=${params.access_token}`, {} ); };

//(虚拟币模块)
//获取可以使用的token列表
export const tokenList = params => { return axios.get(`${base}/token/bigToken/tokenNameId?access_token=${params.access_token}`, params ); };
export const tokenone = params => { return axios.get(`${base}/token/bigToken/selectBigAdminTokenOne?access_token=${params.access_token}`, params ); };
//查询代币列表
export const xnbList = params => { return axios.post(`${base}/token/bigToken/tokenAdminList?access_token=${params.access_token}`, params); };
//查询代币对应的可用虚拟地址
export const xnbAddress = params => { return axios.get(`${base}/token/bigToken/queryAvailableAddressNum?access_token=${params.access_token}`, params ); };
//添加虚拟币
export const addxnb = params => { return axios.post(`${base}/token/bigToken/saveBigAdminToken?access_token=${params.access_token}`, params ); };
//更新虚拟币
export const updatexnb = params => { return axios.post(`${base}/token/bigToken/BigAdminTokenupdate?access_token=${params.access_token}`, params ); };
//交易区
export const tradeArea = params => { return axios.get(`${base}/token/bigToken/bigAdminTradingAreaselectOne?tokenId=${params.id}&access_token=${params.access_token}`, params ); };
export const updateTradeArea = params => { return axios.post(`${base}/token/bigToken/BigAdminTradingAreaupdate?access_token=${params.access_token}`, params ); };
//提现手续费
export const drawPrice = params => { return axios.get(`${base}/token/bigToken/bigAdminServiceChargePOList?tokenId=${params.id}&access_token=${params.access_token}` ); };
export const updatedrawPrice = params => { return axios.post(`${base}/token/bigToken/BigAdminServiceChargeupdate?access_token=${params.access_token}`, params ); };
//查询手续费列表
export const drawpriceList = params => { return axios.post(`${base}/transaction/transaction/selectListServiceChargePO?access_token=${params.access_token}`, params ); };
export const drawpriceTJ = params => { return axios.post(`${base}/transaction/transaction/liststartDateAndStopDate?access_token=${params.access_token}`, params ); };
//统计固定时间段的虚拟币
export const xnbStatistic = params => { return axios.post(`${base}/token/bigToken/liststartDateAndStopDate?access_token=${params.access_token}`, params ); };


//虚拟币上线
export const xnbOnline = params => { return axios.get(`${base}/token/bigToken/tokenonline?tokenId=${params.id}&access_token=${params.access_token}`); };
//生成钱包地址
export const generateWallet = params => { return axios.get(`${base}/token/bigToken/CreateWallet?tokenId=${params.tokenId}&num=${params.num}&access_token=${params.access_token}`); };
export const testWallet = params => { return axios.get(`${base}/token/bigToken/Balance?tokenId=${params.id}&access_token=${params.access_token}`); };

//(资金模块)
//查询充值提现列表
export const userCashfit = params => { return axios.post(`${base}/tokenRecord/tokenRecord/adminselectBigAppChargeProvidedList?access_token=${params.access_token}`, params ); };

export const authedCash = params => { return axios.post(`${base}/tokenRecord/tokenRecord/selectBigAppChargeProvidedListAudited?access_token=${params.access_token}`, params ); };

export const authedFit = params => { return axios.post(`${base}/tokenRecord/tokenRecord/selectBigAdminLogRechargeListAudited?access_token=${params.access_token}`, params ); };
//查询手动充值列表
export const managerFit = params => { return axios.post(`${base}/tokenRecord/tokenRecord/selectBigAdminLogRechargeList?access_token=${params.access_token}`, params ); };
//添加手动充值记录
export const addmanagerFit = params => { return axios.post(`${base}/tokenRecord/tokenRecord/saveBigAdminLogRecharge?access_token=${params.access_token}`, params ); };
//添加充值提现记录
export const adduserCashfit = params => { return axios.post(`${base}/tokenRecord/tokenRecord/saveBigAppChargeProvided?access_token=${params.access_token}`, params ); };
//更新手动充值记录
export const editmanagerFit = params => { return axios.post(`${base}/tokenRecord/tokenRecord/updateBigAdminLogRecharge?access_token=${params.access_token}`, JSON.stringify(params) ); };
//审核手动充值列表
//export const authmanagerFit = params => { return axios.post(`${base}tokenRecord/tokenRecord/auditBigAdminLogRecharge?access_token=${params.access_token}`, params );  };

export const authmanagerFit = params => { 
	console.log(params);
	
	let url = `${base}/tokenRecord/tokenRecord/auditBigAdminLogRecharge?access_token=${params.access_token}`;
	console.log('—url—');
	console.log(url);
	return axios.post(url, params ); 
};

//充值数据更新
export const edituserFit = params => { return axios.post(`${base}/tokenRecord/tokenRecord/recharge?access_token=${params.access_token}`, params ); };
//提现数据更新
export const edituserCash = params => { return axios.post(`${base}/tokenRecord/tokenRecord/withdraw?access_token=${params.access_token}`, params ); };
//转账记录
export const transferRecord = params => { return axios.post(`${base}/chat/chat/selectListBigAppUserTransferAccounts?access_token=${params.access_token}`, params ); };
//充值提现统计
export const fitcashstatis = params => { return axios.post(`${base}/tokenRecord/tokenRecord/liststartDateAndStopDate?access_token=${params.access_token}`, params ); };

//（代理模块）
//查询代理单列表
export const agentRecord = params => { return axios.post(`${base}/agent/agent/selectListAdminAgent?access_token=${params.access_token}`, params); };
export const agentDetail = params => { return axios.post(`${base}/agent/agent/selectBigAdminAgent?access_token=${params.access_token}`, params); };

//代理单审核
export const agentAuth = params => { return axios.post(`${base}/agent/agent/updateAdminAgentStatus?access_token=${params.access_token}`, params); };
export const authedAgent = params => { return axios.post(`${base}/agent/agent/selectListAdminAgentAudited?access_token=${params.access_token}`, params); };

//多条件历史代理单
export const historyAgent = params => { return axios.post(`${base}/agent/agent/selectListBigAdminAgentTransaction?access_token=${params.access_token}`, params); };


//（系统设置模块）
//系统参数列表
export const systemPara = params => { return axios.post(`${base}/adminUser/adminuser/parameterAll?access_token=${params.access_token}`, params ); };
export const modifysysPara = params => { return axios.post(`${base}/adminUser/adminuser/parameterset?access_token=${params.access_token}`, params ); };
export const delsysPara = params => { return axios.post(`${base}/adminUser/adminuser/parameterdel?access_token=${params.access_token}`, params ); };

//模块
export const getmodules = params => { return axios.post(`${base}/adminUser/adminuser/modulelist?access_token=${params.access_token}`, params ); };

//权限
export const getpermission = params => { return axios.post(`${base}/adminUser/adminuser/querylistpermission?access_token=${params.access_token}`, params ); };
export const addpermission = params => { return axios.post(`${base}/adminUser/adminuser/addpermission?access_token=${params.access_token}`, params ); };
export const modifyPermission = params => { return axios.post(`${base}/adminUser/adminuser/editpermission?access_token=${params.access_token}`, params ); };
export const delPermission = params => { return axios.post(`${base}/adminUser/adminuser/delpermission?access_token=${params.access_token}`, params ); };

//角色
export const getrole = params => { return axios.post(`${base}/adminUser/adminuser/querylistrole?access_token=${params.access_token}`, params ); };
export const delrole = params => { return axios.post(`${base}/adminUser/adminuser/delrole?access_token=${params.access_token}`, params ); };
export const editrole = params => { return axios.post(`${base}/adminUser/adminuser/editrole?access_token=${params.access_token}`, params ); };
export const addrole = params => { return axios.post(`${base}/adminUser/adminuser/addrole?access_token=${params.access_token}`, params ); };
//查询角色拥有的模块和权限
export const modulepermission = params => { return axios.post(`${base}/adminUser/adminuser/modulepermission?access_token=${params.access_token}`, params ); };
export const setpermission = params => { return axios.post(`${base}/adminUser/adminuser/rolepermission?access_token=${params.access_token}`, params ); };

//管理员
export const getmanager = params => { return axios.post(`${base}/adminUser/adminuser/querylistadminuser?access_token=${params.access_token}`, params ); };
export const delmanager = params => { return axios.post(`${base}/adminUser/adminuser/deladminuser?access_token=${params.access_token}`, params ); };
export const editmanager = params => { return axios.post(`${base}/adminUser/adminuser/editadminuser?access_token=${params.access_token}`, params ); };
export const addmanager = params => { return axios.post(`${base}/adminUser/adminuser/addadminuser?access_token=${params.access_token}`, params ); };
export const modifyPassword = params => { return axios.post(`${base}/adminUser/adminuser/passwordmodify?access_token=${params.access_token}`, params ); };


//(资讯模块)
export const promoteList = params => { return axios.post(`${base}/information/info/getextension?access_token=${params.access_token}`, params ); };
export const editpromote = params => { return axios.post(`${base}/information/info/editextension?access_token=${params.access_token}`, params ); };
export const delpromote = params => { return axios.post(`${base}/information/info/delextension?access_token=${params.access_token}`, params ); };
export const addpromote = params => { return axios.post(`${base}/information/info/addextension?access_token=${params.access_token}`, params ); };
//
export const advertiseList = params => { return axios.post(`${base}/information/info/getadvertise?access_token=${params.access_token}`, params ); };
export const deladvertise = params => { return axios.post(`${base}/information/info/deladvertise?access_token=${params.access_token}`, params ); };
export const addadvertise = params => { return axios.post(`${base}/information/info/addadvertise?access_token=${params.access_token}`, params ); };
export const updateadvertise = params => { return axios.post(`${base}/information/info/editadvertise?access_token=${params.access_token}`, params ); };
//
export const articleList = params => { return axios.post(`${base}/information/info/getarticlepc?access_token=${params.access_token}`, params ); };
export const delarticle = params => { return axios.post(`${base}/information/info/delarticle?access_token=${params.access_token}`, params ); };
export const addarticle = params => { return axios.post(`${base}/information/info/addarticle?access_token=${params.access_token}`, params ); };
export const updatearticle = params => { return axios.post(`${base}/information/info/editarticle?access_token=${params.access_token}`, params ); };
//
export const pushList = params => { return axios.post(`${base}/adminUser/adminuser/querymessagepush?access_token=${params.access_token}`, params ); };
export const allpush = params => { return axios.post(`${base}/adminUser/push/sendCast?access_token=${params.access_token}`, params ); };


export const requestLogin = params => { return axios.post(`${base}/adminUser/adminuser/login?access_token=${params.access_token}`, params).then(res => res.data); };
export const sendvercode = params => { return axios.post(`${base}/adminUser/adminuser/sendcode?access_token=${params.access_token}`, params).then(res => res.data); };

export const googleWechat = params => { return axios.post(`${base}/adminUser/adminuser/googleauth?access_token=${params.access_token}`, params).then(res => res.data); };
export const googleAuth = params => { return axios.post(`${base}/adminUser/adminuser/googleauthdo?access_token=${params.access_token}`, params).then(res => res.data); };
export const logingoogleAuth = params => { return axios.post(`${base}/adminUser/adminuser/querygooglestatus?access_token=${params.access_token}`, params).then(res => res.data); };

//oauth
export const getoauth = params => { return axios.get(`${base1}/oauth2/login?userName=${params.username}&password=${params.password}`, params).then(res => res.data); };
export const refreshoauth = params => { return axios.get(`${base1}/oauth2/refresh?refreshToken=${params.refreshToken}`).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, params ); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, params ); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, params ); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, params ); };

export const editUser = params => { return axios.get(`${base}/user/edit`, params ); };

export const addUser = params => { return axios.get(`${base}/user/add`, params ); };