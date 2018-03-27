
const fmoney = (s, n,type) => {

    if(typeof(s) == "string" && s.indexOf('E')>-1){
        var indexStr = s.indexOf('E');
        var ss=s.substring(indexStr+1);//获取次方
        var ll = s.substring(0,indexStr);//获取底数
        var beishu = Math.pow(10,ss);//获取底数要乘的倍数
        s =ll*beishu;//最终没有格式化的数值
    }
    var cash="";
    if(s=='--'||s==null){
        return '--';
    }else{
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        if(s<0){//考虑负数情况
            s=Math.abs(s);
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            var t = "";
            for(let i = 0; i < l.length; i ++ )
            {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            if (type == "户") {// 不带小数位(默认是有小数位)
                cash = '-'+t.split("").reverse().join("");
            }else{
                cash = '-'+t.split("").reverse().join("") + "." + r;
            }
            return cash;
        }else{
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            t = "";
            for(let i = 0; i < l.length; i ++ )
            {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            if (type == "户") {// 不带小数位(默认是有小数位)
                cash = t.split("").reverse().join("") ;
            }else{
                cash = t.split("").reverse().join("") + "." + r;
            }
            return cash;
        }
    }
}

export {fmoney};
export default fmoney;
