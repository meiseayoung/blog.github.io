/*
 * 随机数生成器
 */
function createRandomList(num,length){
    var MT = [];
    var index = 0;
    var randomNum = [];
    function initialize_generator(seed) {
        MT[0] = seed;
        for (var i = 1; i < 624; i++) {
            MT[i] = 0xffffffff & (0x6c078965 * (MT[i - 1]^(MT[i - 1] >> 30)) + i);
        }
    }
    function generate_numbers() {
        for (var i = 0; i < 624; i++) {
            var y = (MT[i] & 0x80000000) + (MT[(i + 1) % 624] & 0x7fffffff);
            MT[i] = MT[(i + 397) % 624]^(y >> 1);
            if (y % 2 != 0) {
                MT[i] ^= 0x9908b0df;
            }
        }
    }
    function extract_number() {
        if (index == 0) {
            generate_numbers();
        }
        var y = MT[index];
        y ^= (y >> 11);
        y ^= ((y << 7) & 0x9d2c5680);
        y ^= ((y << 15) & 0xefc60000);
        y ^= (y >> 18);
        index = (index + 1) % 624;
        return y;
    }
    function mt_rand(min, max) {
        return extract_number() % (max - min + 1) + min;
    }
    initialize_generator(new Date().getTime());
    for (var i = 0; i < (length || 10) ; i++) {
        randomNum.push(mt_rand(0, num));
    }
    return randomNum;
};
