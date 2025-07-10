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

  type BaseResponsePageUserInterfaceCountVO_ = {
    code?: number;
    data?: PageUserInterfaceCountVO_;
    message?: string;
  };

  type BaseResponseUserInterfaceCountAnalyseVo_ = {
    code?: number;
    data?: UserInterfaceCountAnalyseVo;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type FluxString_ = {
    prefetch?: number;
  };

  type getInterfaceInfoVOByIdUsingGETParams = {
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

  type UserInterfaceCountVO = {
    count?: number;
    interfaceId?: number;
    name?: string;
  };
}
