function fnMail(_Tx, _Rx, _Subject, _Content){
    const exec = require('child_process').exec;
    exec('mail -s"' + _Subject + '" -r"' + _Tx + '" "' + _Rx + '"<<<"' + _Content + '"', {windowsHide : true}, function(err, stdout, stderr){
        console.log('메일 발송 중 오류가 발생했습니다.')
    });
}

module.exports = fnMail;