
//象形柱状图
var CustomBarV2 = Class.extend({
    init:function(opts){
        var config = {
            selector:"#other-agriculture-product-output",
            unit:"万元",
            data:[{
                    name:"2017-01",
                    value:1232
                },
                {
                    name:"2017-02",
                    value:4654
                },
                {
                    name:"2017-03",
                    value:6645
                },
                {
                    name:"2017-04",
                    value:3544
                }
            ]
        };
        this.config = $.extend({},config,opts);
        this.createDOM();
    },
    createDOM:function(){
        var me = this;
        var max = Math.max.apply(null,this.config.data.map(function(value,index){
            return value.value;
        }));
        var dom = this.config.data.map(function(item,index){
            var barWidth = (function(item,max){
                                    return item.value/max*100;
            })(item,max);
            return `<li class="position-relative" data-value="${item.value}">
                        <div class="position-absolute">
                            <div style="width:100px;" class="list-label position-absolute">${item.name}</div>
                        </div>
                        <div class="position-absolute" style="width:calc(100% - 200px);left:105px;">
                            <div class="list-bar" style="width:calc(${barWidth}%)"></div>
                        </div>
                    </li>`

        }).join("");
        $(this.config.selector).html("<ul>"+dom+"</ul>");
        $(this.config.selector).find("li").each(function(index,elem){
            console.log(elem);
            var left = $(elem).find(".list-bar").width() + 105;
            var value = $(elem).attr("data-value");
            $(elem).append(`<div class="position-absolute list-value" style="left:${left+5}px">${value+me.config.unit}</div>`)
        });
    },
    update:function(data){
        this.config.data = data;
        this.createDOM();
    }
});
