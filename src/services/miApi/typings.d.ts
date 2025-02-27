declare namespace API {
  type analyseUsingGETParams = {
    /** number */
    number?: number;
  };

  type BaseResponse = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInterfaceInfoVO_ = {
    code?: number;
    data?: InterfaceInfoVO;
    message?: string;
  };

  type BaseResponseListString_ = {
    code?: number;
    data?: string[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageInterfaceInfoVO_ = {
    code?: number;
    data?: PageInterfaceInfoVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserInterfaceCountVO_ = {
    code?: number;
    data?: PageUserInterfaceCountVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserInterfaceCountAnalyseVo_ = {
    code?: number;
    data?: UserInterfaceCountAnalyseVo;
    message?: string;
  };

  type BaseResponseUserInterfaceCountVO_ = {
    code?: number;
    data?: UserInterfaceCountVO;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getInterfaceInfoVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserInterfaceCountVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceInfoAddRequest = {
    consumeMiCurrency?: number;
    description?: string;
    host?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParam?: string;
    responseHeader?: string;
    sampleRequestParam?: string;
    url?: string;
  };

  type InterfaceInfoQueryRequest = {
    current?: number;
    description?: string;
    host?: string;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userid?: number;
  };

  type InterfaceInfoUpdateRequest = {
    consumeMiCurrency?: number;
    description?: string;
    host?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParam?: string;
    responseHeader?: string;
    sampleRequestParam?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoVO = {
    consumeMiCurrency?: number;
    createTime?: string;
    description?: string;
    host?: string;
    id?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParam?: string;
    responseHeader?: string;
    sampleRequestParam?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userid?: number;
  };

  type InvokeInterfaceRequest = {
    id?: number;
    interfaceParam?: string;
  };

  type LoginUserVO = {
    accessKey?: string;
    createTime?: string;
    id?: number;
    miCurrency?: number;
    secretKey?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageInterfaceInfoVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfoVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserInterfaceCountVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserInterfaceCountVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type SseEmitter = {
    timeout?: number;
  };

  type sseUsingGETParams = {
    /** userId */
    userId?: number;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    miCurrency?: number;
    mpOpenId?: string;
    secretKey?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserInterfaceCountAddRequest = {
    id?: number;
    interfaceId?: number;
    residueCount?: number;
  };

  type UserInterfaceCountAnalyseVo = {
    total?: number;
    userInterfaceCountVoS?: UserInterfaceCountVO[];
  };

  type UserInterfaceCountQueryRequest = {
    createTime?: string;
    current?: number;
    id?: number;
    interfaceId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    updateTime?: string;
    userid?: number;
  };

  type UserInterfaceCountUpdateRequest = {
    id?: number;
    residueCount?: number;
    status?: number;
  };

  type UserInterfaceCountVO = {
    count?: number;
    interfaceId?: number;
    name?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
