var SearchPanel = Class.extend({
    init : function(opts){
        this.config = {
            widgetItems : {},
            conditionList : [],
            renderTo : "",
            exportStatus:false,
            assistanceURL : {
                   // 查询条件-获取时间
                timeInfo : basePath + "vipAbnormalAnalysis/abnormalDate.action",
                // 查询页面数据
                detailData : basePath + "vipAbnormalAnalysis/abnormalData.action",
                // 数据导出
                exportData : basePath + "vipAbnormalAnalysis/abnormalDataExport.action"
            }    
        };
        this.config = $.extend({},this.config,opts);
    },
    show:function(){
        this._createPanel();
        $(".br_border").css({
            padding:"3px 0",
            borderBottom:"1px solid #ccc"
    });
    },
    //创建panel和panel里面的项目
    _createPanel : function(){
        var me = this;
        $("<div id='"+me.config.renderId+"'></div>").appendTo("body");
        var gridReader = new Sweet.Reader.JsonReader();
        var gridStore = new Sweet.Store.GridStore({
            reader:gridReader,
            cache:true,        //这里必须设为true，设为false的话排序和翻页等功能会发送请求到后台处理
            contentType:"application/x-www-form-urlencoded;chartset=UTF-8",
            timeout:null
        });

        var gridStore1 = new Sweet.Store.GridStore({
            reader:gridReader,
            cache:true,
            contentType:"application/x-www-form-urlencoded;chartset=UTF-8",
            timeout:null
        });

        var startTime = new Sweet.form.Date({
            width:226,
            height:24,
            label:true,
            labelText:"时间范围",
            labelWidth:80,
            format: "yyyy-MM-dd 00:00",
            emptyText:"",
            value:{value:new Date().format("YYYY-MM-DD"),text:new Date().format("YYYY-MM-DD")}
        });
        var label = new Sweet.form.Label({
            width : 8,
            height:24,
            symbol: false,
            value : {text:"-"}
        });
        var endTime = new Sweet.form.Date({
            width:140,
            height:24,
            label:false,
            format:"yyyy-MM-dd 00:00",
            emptyText:"",
            value:{value:new Date().yestoday("YYYY-MM-DD"),text:new Date().yestoday("YYYY-MM-DD")},
            errorModel:"none",      
            validateFun : {eventName:"blur", params: {}, fun: endTimeValidate}
        });
        //自定义结束时间条件判定
        function endTimeValidate(event,val,params){
            var me = this;
            var errorMsg = "结束时间不能小于开始时间。请重新选择！";
            if(new Date(endTime.getValue().value.split(" ")[0])-0 < new Date(startTime.getValue().value.split(" ")[0])-0){
                return {"success": false, "message": errorMsg};
            }
            else{
                return {"success": true, "message": ""};
            }
        };

        //从服务器摘取时间并应用到Date组件
        $.ajax({
            type:"get",
            url:me.config.assistanceURL.timeInfo,
            dataType:"json",
            success:function(res){
                startTime.setMinDate(res.min);
                startTime.setMaxDate(res.yestoday);
                startTime.setValue({value:res.yestoday,text:res.yestoday});
                endTime.setMinDate(res.min);
                endTime.setMaxDate(res.today);
                endTime.setValue({value:res.today,text:res.today});
            }
        });
        var comboBox = new Sweet.form.ComboBox_v1({
            width:60,
            height:24,
            data:[
                {value:"-1",text:"全部"},
                {value:"0",text:"用户"},
                {value:"1",text:"小区"}
            ]
        });
        var searchInput = new Sweet.form.TextField({ 
             width: 140,
             label: false,
             editable :false,
             allowDecimals: false,    //不允许输入小数
             maxLength:64,
             tip: true,
             emptyText: "请输入...",
             errorModel:"none",      
             validateFun : {eventName:"blur", params: {}, fun:inputStringValidate}
        });
        //自定义输入条件
        function inputStringValidate(event, val, params) {               
            var me = this,
                userRe = /^(\d+|)$/,
                areaRe = /^([0-9a-fA-F]+|\d+|)$/,
                ch = val.text.trim(),
                userErrMsg = "用户号码只接受纯数字，请重新输入数据!",
                areaErrMsg = "小区编码只接受16进制数据,请重新输入数据";
            if(comboBox.getValue().value==0){
                if(!userRe.test(ch)){
                return {"success": false, "message": userErrMsg};
            }
            return {"success": true, "message": ""};
            }
            else if(comboBox.getValue().value==1){
                if(!areaRe.test(ch)){
                return {"success": false, "message": areaErrMsg};
            }
            return {"success": true, "message": ""};
            }    
        };

        var analyseType = new Sweet.form.ComboBox_v1({
             width:150,
             heigh:24,
             label:true,
             labelText:"类型",
             data:[
                 {value:"0",text:"频繁PDP激活"},
                 {value:"1",text:"频繁TAU"},
                 {value:"2",text:"PDN激活"},
                 {value:"3",text:"默认承载建立"}
             ]    
        });
        var searchBnt = new Sweet.form.Button({
            width:120,
            height:26,
            highLight:true,
            value:{value:"searchBnt",text:"查询"}
        });

                /*************************点击查询按钮展开grid************************/
        searchBnt.addListener("click",function(){
            //开始时间大于结束时间条件判定
            if(endTime.check()==true&&searchInput.check()==true && (new Date(endTime.getValue().value.split(" ")[0]) - 0) > (new Date(startTime.getValue().value.split(" ")[0]) - 0) ){                                         
                                        hpanel.show();
                                        switchLoad()();
            }
            else{
                Sweet.Dialog.error( { 
                          width: 330,        
                          height: 137,       
                          modal: true, 
                          message: "<span style='text-align:center'>填充条件不符合要求，请重新输入</span ><br/>",     //提示信息     
                          listeners: { "ok" : function(){
                                          return;
                                          } 
                                     }
                        })
            }
   
        });

        var userGrid = new Sweet.grid.Grid({
                    width:"100%",
                    height:"100%",
                    title:"用户",
                    id:"user",
                    store:gridStore,
                    data:{
                        columns:[
                            {
                                header : "日期",
                                tooltip : "日期",
                                name:"START_TIME",
                                height : 25,
                                sortable : true,
                                dataType : "date",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false
                            },
                            {
                                header : "用户号码",
                                tooltip : "用户号码",
                                name:"NUM",
                                height : 25,
                                sortable : true,
                                dataType : "string",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false                                
                            },
                            {
                                header : "请求次数",
                                tooltip : "请求次数",
                                name:"REQUESTS",
                                height : 25,
                                sortable : true,
                                dataType : "number",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false                                
                            },
                            {
                                header : "成功次数",
                                tooltip : "成功次数",
                                name:"SUCCESS",
                                height : 25,
                                sortable : true,
                                dataType : "number",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false
                            },
                            {
                                header : "成功率（%）",
                                tooltip : "成功率（%）",
                                name:"SUCCESS_RATE",
                                height : 25,
                                sortable : true,
                                dataType : "number",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false
                            },
                            {
                                header : "类型",
                                tooltip : "类型",
                                name:"TYPE",
                                height : 25,
                                sortable : true,
                                dataType : "string",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false
                            }
                        ],
                                resizable: true,
                                singleSelect: true,
                                selectColumn: true,
                                multiColumnSort: false,
                                clearFilters: false,
                                export: true,
                                exportType: ["csv", "xls"],
                                page : {
                                     size : 50,
                                     total:"auto",
                                     select : [ 20, 50, 100 ]
                                 }

                    }
                });
        var areaGrid = new Sweet.grid.Grid({
                    title:"小区",
                    width:"100%",
                    height:"100%",
                    id:"area",
                    store:gridStore1,
                    data:{
                        columns:[
                            {
                                header : "日期",
                                tooltip : "日期",
                                name:"START_TIME",
                                height : 25,
                                sortable : true,
                                dataType : "date",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false
                            },
                            {
                                header : "小区编码",
                                tooltip : "小区编码",
                                name:"CELL_ID",
                                height : 25,
                                sortable : true,
                                dataType : "string",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false                                
                            },
                            {
                                header : "小区名称",
                                tooltip : "小区名称",
                                name:"CELL_NAME",
                                height : 25,
                                sortable : true,
                                dataType : "string",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false                                
                            },
                            {
                                header : "请求次数",
                                tooltip : "请求次数",
                                name:"REQUESTS",
                                height : 25,
                                sortable : true,
                                dataType : "number",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false                                
                            },
                            {
                                header : "成功次数",
                                tooltip : "成功次数",
                                name:"SUCCESS",
                                height : 25,
                                sortable : true,
                                dataType : "number",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false
                            },
                            {
                                header : "成功率（%）",
                                tooltip : "成功率（%）",
                                name:"SUCCESS_RATE",
                                height : 25,
                                sortable : true,
                                dataType : "number",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false
                            },
                            {
                                header : "类型",
                                tooltip : "类型",
                                name:"TYPE",
                                height : 25,
                                sortable : true,
                                dataType : "string",
                                filter : false,
                                enableHdMenu : false,
                                tip : true,
                                hidden : false
                            }
                        ],
                        resizable: true,
                        singleSelect: true,
                        selectColumn: true,
                        multiColumnSort: false,
                        clearFilters: false,
                        export: true,
                        exportType: ["csv", "xls"],
                        page : {
                             size : 50,
                             select : [ 20, 50, 100 ]
                         }
                    }

                });
        //导出数据
        userGrid.addListener("export",function(e,data){
                if(me.config.exportStatus == true){
            var params = {
                            start : 0,
                            limit : 100000,
                            startTime : startTime.getValue().value,
                            endTime : endTime.getValue().value,
                            kpiType : analyseType.getValue().value,
                            userType : "0",
                            queryValue : searchInput.getValue().text,
                            exportType : data.type
                        };
            $.ajax({
                    url:me.config.assistanceURL.exportData,
                    type:"post",
                    dataType:"json",
                    data:params,
                    success:function(res){
                        window.location.href=res.path;
                    }
            });
           }
        });
        areaGrid.addListener("export",function(e,data){
                if(me.config.exportStatus==true){
            var params = {
                            start : 0,
                            limit : 100000,
                            startTime : startTime.getValue().value,
                            endTime : endTime.getValue().value,
                            kpiType : analyseType.getValue().value,
                            userType : "1",
                            queryValue : searchInput.getValue().text,
                            exportType : data.type
            };
            $.ajax({
                    url:me.config.assistanceURL.exportData,
                    type:"post",
                    data:params,
                    dataType:"json",
                    success:function(res){
                        window.location.href=res.path;
                    }
            });
           }
        });
        var tabPanel = new Sweet.panel.TabPanel({
            width:"100%",
            height:"100%",
            items:[userGrid,areaGrid]
        });
        var items = [startTime,label,endTime,comboBox,searchInput,analyseType,searchBnt];        
        var flowpanel = new Sweet.panel.FlowPanel({
            width:"100%",
            // height:"6%",        //FlowPanel不能设置固定高度，内部使用float:left;如果设置固定高度，一旦第一行宽度不够会浮动到下一行，那样就破坏了原本的布局
            items:items,
            widgetClass:"br_border"      
        });
        var hpanel = new Sweet.panel.HPanel({
            width:"100%",
            height:"95%",
            items:[tabPanel]
        });        
        function switchLoad(){
                switch(comboBox.getValue().value){
                case "0":
                    return function(){
                            Sweet.Ajax.request({
                                type:"post",
                                dataType:"json",
                                url :me.config.assistanceURL.detailData,
                                data:{
                                    start : 0,
                                    limit : 5000,
                                    startTime : startTime.getValue().value,
                                    endTime : endTime.getValue().value,
                                    kpiType : analyseType.getValue().value,
                                    userType : comboBox.getValue().value,
                                    queryValue : searchInput.getValue().text
                                    },
                                success:function(res){
                                    me.config.exportStatus=true;
                                    gridStore.loadData({data:res.data,page:res.page});
                                }
                            })
                    };
                case "1":
                    return function(){
                            Sweet.Ajax.request({
                                type:"post",
                                dataType:"json",
                                url :me.config.assistanceURL.detailData,
                                data:{
                                    start : 0,
                                    limit : 5000,
                                    startTime : startTime.getValue().value,
                                    endTime : endTime.getValue().value,
                                    kpiType : analyseType.getValue().value,
                                    userType : comboBox.getValue().value,
                                    queryValue : searchInput.getValue().text
                                    },
                                success:function(res){
                                    me.config.exportStatus=true;
                                    gridStore1.loadData({data:res.data,page:res.page});
                                }    
                            })

                    };
                case "-1":
                    return function(){
                             Sweet.Ajax.request({
                                type:"post",
                                dataType:"json",
                                url :me.config.assistanceURL.detailData,
                                data:{
                                    start : 0,
                                    limit : 5000,
                                    startTime : startTime.getValue().value,
                                    endTime : endTime.getValue().value,
                                    kpiType : analyseType.getValue().value,
                                    userType : "0",
                                    queryValue : searchInput.getValue().text
                                    },
                                success:function(res){
                                    me.config.exportStatus=true;
                                    gridStore.loadData({data:res.data,page:res.page});
                                }    
                            })        
                            Sweet.Ajax.request({
                                type:"post",
                                dataType:"json",
                                url :me.config.assistanceURL.detailData,
                                data:{
                                    start : 0,
                                    limit : 5000,
                                    startTime : startTime.getValue().value,
                                    endTime : endTime.getValue().value,
                                    kpiType : analyseType.getValue().value,
                                    userType : "1",
                                    queryValue : searchInput.getValue().text
                                    },
                                success:function(res){
                                    me.config.exportStatus=true;
                                    gridStore1.loadData({data:res.data,page:res.page});
                                }
                            })
                    }

            }
}    

        var panel = new Sweet.panel.VPanel({
            width:"100%",
            height:"100%",
            renderTo:me.config.renderTo,    
            items:[flowpanel,hpanel]
        });
        hpanel.hide();
        
             //清空所有Grid
            gridStore.loadData({data:[].data,page:{totol:0}});
            gridStore1.loadData({data:[].data,page:{totol:0}});
             //导出状态设为false
            me.config.exportStatus = false;

        /***********************当查询所有用户/小区时，“类型”不能选择“全部”******************/
         comboBox.addListener("change",function(e,data){
             if(data.text=="全部"){
                             searchInput.setValue({});
                             searchInput.setEditable(false);
                             analyseType.setData([
                                 {value:"0",text:"频繁PDP激活"},
                                 {value:"1",text:"频繁TAU"},
                                 {value:"2",text:"PDN激活"},
                                 {value:"3",text:"默认承载建立"}
                                ]);
                             tabPanel.showItem("user");
                             tabPanel.showItem("area");

             }
             else{
                 searchInput.setValue({});
                searchInput.setEditable(true);
                analyseType.setData([
//                                         {value:"-1",text:"全部"},
                                         {value:"0",text:"频繁PDP激活"},
                                         {value:"1",text:"频繁TAU"},
                                         {value:"2",text:"PDN激活"},
                                         {value:"3",text:"默认承载建立"}
                                        ]);
                if(data.text=="用户"){
                    tabPanel.showItem("user");
                    tabPanel.hideItem("area");
                }
                else if(data.text=="小区"){
                    tabPanel.showItem("area");
                    tabPanel.hideItem("user");
                }
             }
         });
        analyseType.addListener("change",function(e,data){
            //清空所有Grid
            gridStore.loadData({data:[].data,page:{totol:0}});
            gridStore1.loadData({data:[].data,page:{totol:0}});
            //导出状态设为false
            me.config.exportStatus = false;

        });
        searchInput.addListener("change",function(e,data){
            if(data.text!==""){
                                analyseType.setData([
                                         {value:"-1",text:"全部"},
                                         {value:"0",text:"频繁PDP激活"},
                                         {value:"1",text:"频繁TAU"},
                                         {value:"2",text:"PDN激活"},
                                         {value:"3",text:"默认承载建立"}
                                        ]);
            }
            else{
                 analyseType.setData([
                     {value:"0",text:"频繁PDP激活"},
                     {value:"1",text:"频繁TAU"},
                     {value:"2",text:"PDN激活"},
                     {value:"3",text:"默认承载建立"}
                    ]);
            }
        });
        return panel;
    }
})