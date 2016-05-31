/*！
 * author:johnnynode@gmail.com
 * des: web libary
 */

(function (w) {
    var Util = function () {}
    Util.prototype = {
        elements:[],
        extend:function(target,source){
            for(var i  in source){
                target[i] = source[i];
            }
            return target;
        }
    }
    var $$ = new Util();
    "use strict";

    /* 用extend实现模块化管理 */

    /* 对字符串的操作 */
    $$.extend($$,{
        ltrim:function(str){
            return str.replace(/(^\s*)/,'');
        },
        rtrim:function(str){
            return str.replace(/(\s*$)/,'');
        },
        trim:function(str){
            return str.replace(/(^\s*)|(\s*$)/g,'');
        },
        formateString:function(str,data){
            return str.replace(/@\((\w+)\)/g,function(match,key){
                return typeof data[key] === 'undefined'?'':data[key];
            });
        },
        /* 此处依赖art-template插件 */
        bindAtrtemplate:function(str,data){
            var render = template.compile(str);
            var html = render(data);
            return html;
        },
        /* 查询字符串 */
        querystring:function(){
            var str = window.location.search.substring(1);
            var arr = str.split('&');
            var json = {};
            for(var i=0; i<arr.length;i++){
                var c = arr[i].indexOf('=');
                if(c == -1) continue;
                var d = arr[i].substring(0,c);
                var e = arr[i].substring(c+1);
                json[d] = e;
            }
            return json;
        }
    });

    /* 数据类型检测模块 */
    $$.extend($$,{
        isNumber:function(val){
            return typeof val === 'number';
        },
        isBoolean:function(val){
            return typeof val === 'boolean';
        },
        isString:function(val){
            return typeof val === 'string';
        },
        isUndefined:function(val){
            return typeof val === 'undefined';
        },
        isObj:function(str){
            if(str === null || typeof str === 'undefined'){
                return false;
            }
            return typeof str === 'object';
        },
        isNull:function(val){
            return val === null;
        },
        isArray:function(arr){
            return Object.prototype.toString.call(arr) === '[object Array]';
        }
    });

    /* 选择器模块 */
    $$.extend($$,{
        $id:function(eleId){
            return document.getElementById(eleId);
        },
        $tag:function(tag,id){
            function getDom(id){
                var dom;
                /* 如果是字符串，默认按照id来选择dom */
                if($$.isString(id)){
                    dom = document.getElementById(id);
                }else{
                    dom = id;
                }
                return dom;
            }
            function getElements(context,tag){
                if(context){
                    return context.getElementsByTagName(tag);
                }else{
                    return document.getElementsByTagName(tag);
                }
            }
            var dom = getDom(id);
            var eles = getElements(dom,tag);
            return eles;
        },
        $class:function(classname,context){
            if(context){
                if($$.isString(context)){
                    context = $$.$id(context);
                }
            }else{
                context = document;
            }
            /*需要判断原生是否支持*/
            if(document.getElementsByClassName){
                return context.getElementsByClassName(classname);
            }else{
                // 需要手动解决浏览器兼容
                var eles = [];
                var dom = context.getElementsByTagName('*');
                for(var i=0; i<dom.length; i++){
                    var itemClassArr = dom[i].className.split(' ');
                    for(var j=0;j<itemClassArr.length;j++){
                        if(itemClassArr[j] === classname){
                            eles.push(dom[i]);
                        }
                    }
                }
                return eles;
            }
        }

    });

    /* 事件框架 */
    $$.extend($$,{
        on:function(id,type,fn){
            var dom = $$.isString(id)?$$.$id(id):id;
            if(dom.addEventListener){
                dom.addEventListener(type,fn,false);
            }else if(dom.attachEvent){
                dom.attachEvent('on'+type,fn);
            }
        },
        un:function(id,type,fn){
            var dom = $$.isString(id)?$$.$id(id):id;
            if(dom.removeEventListener){
                dom.removeEventListener(type,fn);
            }else if(dom.detachEvent){
                dom.detachEvent(type,fn);
            }
        },
        click:function(id,fn){
            $$.on(id,'click',fn);
        },
        mouseover:function(id,fn){
            $$.on(id,'mouseover',fn);
        },
        mouseout:function(id,fn){
            $$.on(id,'mouseout',fn);
        },
        hover:function(id,fnOver,fnOut){
            if(fnOver){
                $$.on(id,'mouseover',fnOver);
            }
            if(fnOut){
                $$.on(id,'mouseout',fnOut);
            }
        },
        getEvent:function(e){
            return e?e:window.event;
        },
        getTarget:function(e){
            var evt = $$.getEvent(e);
            return evt.target || evt.srcElement;
        },
        preventDefault:function(e){
            var evt = $$.getEvent(e);
            if(evt.preventDefault){
                evt.preventDefault();
            }else{
                evt.returnValue = false;
            }
        },
        stopPropagation:function(e){
            var evt = $$.getEvent(e);
            if(evt.stopPropagation){
                evt.stopPropagation();
            }else{
                evt.cancelBubble = true;
            }
        }
    });

    /* 样式操作 */
    $$.extend($$,{
        getStyle:function(dom){
            if(dom.currentStyle){
                return dom.currentStyle[key];
            }else{
                return getComputedStyle(dom,null)[key];
            }
        },
        setStyle:function(dom,key,value){
            dom.style[key] = value;
        },
        css:function(context,key,value){
            /*如果是数组*/
            if(context){
                /* 如果有value就是设置css */
                if(value){
                    for(var i = dom.length-1;i>=0;i--){
                        $$.setStyle(dom[i],key,value);
                    }
                }else{
                    /* 否则就是获取css */
                    return getStyle(dom[0]);
                }
            }else{
                /* 如果不是数组 */
                if(value){
                    $$.setStyle(dom,key,value);
                }else{
                    return $$.getStyle(dom,key);
                }
            }
        },
        hide:function(context){
            for(var i=0;i<doms.length; i++){
                doms[i].style.display='none';
            }
        },
        show:function(context){
            for(var i=0;i<doms.length; i++){
                doms[i].style.display='block';
            }
        }
    });

    /* 属性操作 */
    $$.extend($$,{
        attr:function(context,key,value){
            /* 如果是一个数组的话 */
            if(context.length){
                if(value){
                    for(var i=0;i<context.length;i++){
                        context[i].setAttribute(key,value);
                    }
                }else{
                    return doms[0].getAttribute(key);
                }
            }else{
            /* 如果是单个元素 */
                if(value){
                    context.setAttribute(key,value);
                }else{
                    return context.getAttribute(key);
                }
            }
        },
        /*在这里约定，第一个参数是上下文，其他参数都是属性*/
        removeAttr:function(){
            var list = Array.prototype.slice.call(arguments);
            var context = list[0];
            var attrs = list.slice(1);
            function removeOne(dom){
                for(var j=0;j<attrs.length;j++){
                    dom.removeAttribute(attr[j]);
                }
            }
            /* 如果context是数组的话 */
            if(context.length){
                for(var i=0; i<context.length;i++){
                    removeOne(context[i]);
                }
            }else{
                removeOne(context);
            }
        }
    })
    /* class操作 */
    $$.extend($$,{
        addClass:function(context,classname){
            function addClassName(dom){
                dom.className += " " + classname;
            }
            /* 如果是数组 */
            if(context.length){
                for(var i=0; i<context.length; i++){
                    addClassName(context[i])
                }
            }else{
                addClassName(context)
            }
        },
        removeClass:function(context,classname){
            function removeClassname(dom,name){
                dom.className = dom.className.replace(name,'');
            }
            if(context.length){
                for(var i=0; i<context.length; i++){
                    removeClassname(context[i],classname);
                }
            }else{
                removeClassname(context,classname);
            }
        }
    })

    /* html操作 */
    $$.extend($$,{
        html:function(context,str){
            /* 如果是数组的话 */
            if(context.length){
                /* 存在str参数的话 => 设置模式 */
                if(str){
                    for(var i=0;i<context.length;i++){
                        context[i].innerHTML = str;
                    }
                }else{
                /* 获取模式 */
                    return context[0].innerHTML;
                }
            }else{
                if(str){
                    context.innerHTML = str;
                }else{
                    return context.innerHTML;
                }
            }
        }
    })

    /* 其他操作 */
    $$.extend($$,{
        /*模拟placeholder*/
        placeHolder:function(id,str){
            var dom = document.getElementById(id);
            dom.onfocus = function(){
                trim(dom);
                // rgb的方式为了兼容chrome
                if(dom.value === str && (dom.style.color === '#ccc' || dom.style.color === 'rgb(204, 204, 204)')){
                    dom.value = '';
                }
                dom.style.color = '#333';
            }
            dom.onblur = function(){
                trim(dom);
                console.log(dom.value);
                if(!dom.value){
                    dom.value = str;
                    dom.style.color = '#ccc';
                }
            }
            function trim(obj){
                if(typeof obj === 'object'){
                    // use regular expression to trim two sides space
                    obj.value = obj.value.replace(/^\s+|\s+$/g,"");
                }
            }
        },
        /* 5s 之后跳转页面 */
        doRedirect:function(eleId,URL){
            var dom = document.getElementById(eleId);
            var num = 5;
            (function () {
                dom.innerHTML = num;
                num--;
                /*  每秒钟调用函数自身一次  */
                setTimeout(arguments.callee, 1000);
                if (num === 0) {
                    window.location.href = URL;
                }
            })();
        }
    });

    // 最后暴露出去核心对象
    w.$$ = w.Util = $$;

})(window);
