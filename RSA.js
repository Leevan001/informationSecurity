// RSA算法
console.log("hello world");
function quickpow(m, n, k){
    var r = 1;
    while(n > 0) {
        if(n & 1)
            r = (r * m) % k;
        n = n >> 1 ;
        m = (m * m) % k;
    }
    return r;
}

// miller-rabin 算法素性检测
function isprime_mr(a,b){
    if (!b){
        b = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
    }
    if (a == 2){
        return true
    }
    if (a % 2 == 0 || a == 1){
        return false
    }
    for (var i = 0; i < b.length; i++) {
        var x = b[i]
        var t = a - 1
        while (t % 2 == 0){
            var v = quickpow(x, t, a)
            if (!(v == 0 ||
                  v == 1 ||
                  v == a-1 )){
                return false
            }else{
                if (v == 0 ||
                    v == a-1){
                    break
                }
                t = (t / 2) | 0
            }
        }
    }
    return true
}

function gen_prime(bitlen){
    var n = (1<<(bitlen-1)) + Math.random() * ((1<<(bitlen-1)) * 0.9) | 1
    while (1){
        n += 2
        if (isprime_mr(n)){
            return n
        }
    }
}

function ex_gcd(a, b){
    if (b == 0){
        return [1, 0, a]
    }
    var [x, y, r] = ex_gcd(b, a%b)
    var t = x
    var x = y
    var y = t - (a / b | 0) * y
    return [x, y, r]
}

function create_rsa_key(l){
    var e = 1861
    if (l % 2 == 1){ throw Error('must be even.') }
    while(1){
        var p = gen_prime(l / 2)
        var q = gen_prime(l / 2)
        var n = p * q
        if ((n.toString(2).length == l) && p != q){
            break
        }
    }
    var fn = (p - 1) * (q - 1)
    var [a, b, r] = ex_gcd(fn, e)
    var d = b < 0 ? b + fn : b
    return [e, d, n,p,q]
}


var t = gen_prime(20)
console.log(t)
var [e, d, n,p,q] = create_rsa_key(20)
console.log(e, d, n,p,q)
console.log(n.toString(2).length)

console.log('rsa pub key n,e', n, e)
console.log('rsa pri key n,d', n, d)

function test(o){
    var c = quickpow(o, e, n)
    var v = quickpow(c, d, n)
    console.log('(rsa original data)', o)
    console.log('(rsa decoding data)', v)
    console.log('(rsa encoding data)', c)
    console.log()
}

test(12345)
test(11111)
test(33333)

function myfunc(){
    plaintext=plainText.value;    
    var t = gen_prime(20)
    console.log(t)
    var [e, d, n, p, q] = create_rsa_key(20)
    document.getElementById("box").style.height = "530px"
    var c = quickpow(plaintext, e, n)
    var v = quickpow(c, d, n)
    var tip = "PlainText:" + plaintext + "</br>p:" + p + "&nbsp&nbsp&nbspq:" + q + "</br>n:" + n + "&nbsp&nbsp&nbspe:" + e + "&nbsp&nbsp&nbspd:" + d + "</br>Public Key:" + "(" + n + "," + e + ")" + "</br>Private Key:" + "(" + n + "," + d + ")" + "</br>CipherText:" + c + "</br>PlainText:" + v
    document.getElementById("key").innerHTML = tip;
}