var QuarterCicle = Class.extend({
  /**
   * 初始化
   * @param  opts.selector        type:String             [图表容器选择器]
   * @return opts.data            type:Array<Number>      [数据]
   * @return opts.coefficient     type:Number             [占比系数]
   */
  init:function(opts){
    var config = {
      selector:'',
      data:[0,0,0,0],
      coefficient:1,
      margin:{
        left:0,
        top:0,
        bottom:0,
        right:0
      },
      borderWidth:1,
      paddingWidth:2
    };
    this.config = Object.assign({},config,opts);
    this.svg = d3.select(this.config.selector).append('svg');
    this.linearGradients = [
                            [{stop:0,color:"#ca8a0c"},{stop:50,color:"#826018"},{stop:100,color:"#072135"}],
                            [{stop:0,color:"#339e74"},{stop:50,color:"#1d6055"},{stop:100,color:"#072135"}],
                            [{stop:0,color:"#298899"},{stop:50,color:"#175267"},{stop:100,color:"#072135"}],
                            [{stop:0,color:"#041028"},{stop:50,color:"#233f69"},{stop:100,color:"#5774ce"}]
    ];
    this.createScales();
    this.render();
  },
  /**
   * 创建图表元素所需比例尺
   * @return {[type]} [description]
   */
  createScales:function(){
    var me = this;
    var rect = document.querySelector(me.config.selector).getBoundingClientRect();
    var width = rect.width;
    var height = rect.height;
    var fitSize = me.fitSize = Math.min.apply([],[width,height]);
    var max = Math.max.apply(null, me.config.data);
    var percents = me.percents = me.config.data.map(function(value, index) {
        return value / max * 100 * (me.config.coefficient || 1);
    });
    me.scaleBackArc = d3.arc()
                          .startAngle(0)
                          .endAngle(Math.PI * 2)
                          .innerRadius(fitSize / 2 - me.config.margin.left - 20)
                          .outerRadius(fitSize / 2 - me.config.margin.left);
    //创建底部背景圆弧
    me.createScaleArcBack = function(index) {
        return d3.arc()
            .startAngle(Math.PI * (1.25))
            .endAngle(Math.PI * (2.75))
            .innerRadius(fitSize/2 - me.config.margin.left - (index+1) * 20 - me.config.paddingWidth*2*index)
            .outerRadius(fitSize/2 - me.config.margin.left - index * 20 - me.config.paddingWidth*2*index );
    };
    //根据数据创建圆弧
    me.createScaleArc = function(index){
        return d3.arc()
            .startAngle(Math.PI * (1.25))
            .endAngle(Math.PI * (1.25 + percents[index] * (1.5/100)) )
            .innerRadius(fitSize/2 - me.config.margin.left - (index+1) * 20 - me.config.paddingWidth*2*index)
            .outerRadius(fitSize/2 - me.config.margin.left - index * 20 - me.config.paddingWidth*2*index );
    };
  },
  /**
   * 
   */
  render:function(){
    var me = this;
    //创建底部线条圆弧
    me.svg.attr("width",me.fitSize)
       .attr("height",me.fitSize)
       .selectAll("g")
       .data(me.config.data)
       .enter()
       .append("g")
       .attr("transform",function(t,i){
           return `translate(${me.fitSize/2},${me.fitSize/2})`;
       })
       .append("path")
        .attr("d",function(d,i){
            return me.createScaleArcBack(i)(d) + `M0,${d - 20}`
        })
        .style("fill","rgba(255,255,255,0.01)")
        .style("stroke","rgba(255,255,255,0.2)")
        .style("stroke-width",1)
        .exit();
    //创建圆弧并填充线性渐变
    me.svg
       .selectAll("g")
       .data(me.config.data)
       .append("g")
       .append("path")
        .attr("d",function(d,i){
            return me.createScaleArc(i)(d) + `M0,0`
        })
        .style("fill",function(d,i){
            return `url(#linearGradient${i})`
        })
        .style("stroke",function(d,i){
            return me.linearGradients[i][0].color
        })
        .style("stroke-width",1);
    //创建线性渐变
    me.linearGradients.forEach(function(linearGradient,index){
        me.svg.append("defs")
            .append("linearGradient")
            .attr("id","linearGradient"+index)
            .selectAll("stop")
            .data([0,50,100])
            .enter()
            .append("stop")
            .attr("offset",function(v,i){
                return linearGradient[i].stop + "%";
            })
            .style("stop-color",function(v,i){
                return linearGradient[i].color
            })
    });
  }

});
