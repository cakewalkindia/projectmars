/**
 * Created by SOHEB.RAPATI on 22-05-2015.
 */


Utils = {};
Utils.tmpMask = {

    mask: null,
    show: function (control, msg) {
        var mask = new Ext.LoadMask(eval(control), {
            setMsgAndShow: function (msg) {
                this.msg = msg;
                //this.msg = msg + "&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' onclick=\"Utils.tmpMask.hide();Ext.Msg.notify('Warning','This will not end your request. Your request will keep processing in the background.');\" style='width:50px;background-color:#fff;border:1px solid #333;' value='Hide'></input>";
                this.show();
                this.setZIndex(10000000);
            }
        });

        mask.setMsgAndShow(msg);
        this.mask = mask;

    },

    hide: function () {

        Utils.tmpMask.mask.destroy();

    }

}


Utils.createEventMaskObj = function (control, msg) {
    var eventMask = { customTarget: control, msg: msg, target: "customtarget", showMask: true };
    return eventMask;
}

Utils.setEventMaskObj = function (eventMask) {
    return eventMask != undefined ? eventMask : { showMask: false };
}

Utils.executeCallback = function (callback) {
    if (typeof (callback) == "function") {
        callback();
    }
}

Utils.getAlphaCharacter = function (position) {
    var Alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return Alpha[position - 1];
}

Utils.numberString = function (index) {

    var special = ['Zero', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelvth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
    var deca = ['Twent', 'Thirt', 'Fourt', 'Fift', 'Sixt', 'Sevent', 'Eight', 'Ninet'];


    if (index < 20) return special[index];
    if (index % 10 === 0) return deca[Math.floor(index / 10) - 2] + 'ieth';
    return deca[Math.floor(index / 10) - 2] + 'y-' + special[index % 10];
}


Utils.copyObjects = function (source, target) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
}


Utils.ConcateNosPer = function (nos, per) {
    var vl = '';
    //vl = nos != '' ? (nos + '#') : '';
    //vl += per != '' ? (vl != '' ? per + '%' : per + '%') : '';

    vl = !Ext.isEmpty(nos) ? nos : '';
    vl += ((!Ext.isEmpty(per)) ? "(" + per + ")" : '');

    return vl.trim();
}


Utils.prevUniqueId = "";
Utils.getUniqueId = function () {
    while (true) {
        var dt = new Date();
        var id = "ext-data-" + dt.getUTCDate() + dt.getUTCMonth() + dt.getUTCHours() + dt.getUTCMinutes() + dt.getUTCSeconds() + dt.getMilliseconds();
        if (id != Utils.prevUniqueId) {
            Utils.prevUniqueId = id;
            return id;
        }
    }
}


Utils.getRowwiseDPCount = function (dpList) {
    var cnt = 0;
    var rowWiseDPCnt = 0;
    for (var i = 0; i < dpList.length; i++) {
        if (cnt != dpList[i].Row && cnt < dpList[i].Row) {
            cnt = dpList[i].Row;
            rowWiseDPCnt++;
        }
    }
    return rowWiseDPCnt; //cnt;
}

Utils.getRowwiseDPCountArray = function (dpList) {
    var cnt = [];
    //var rowWiseDPCnt = 0;
    for (var i = 0; i < dpList.length; i++) {
        if (cnt.indexOf(dpList[i].Row) == -1) {
            cnt.push(dpList[i].Row);
            //rowWiseDPCnt++;
        }
    }
    return cnt; //cnt;
}

Utils.rowwiseDPList = function (dpList) {
    var rowwiseDPList = [];

    if (!Ext.isEmpty(dpList)) {
        var cnt = Utils.getRowwiseDPCountArray(dpList);

        var rowNo = dpList[0].Row;

        for (var i = 0; i < cnt.length; i++) {
            var dps = $.grep(dpList, function (e) { return e.Row == cnt[i] });
            rowwiseDPList.push(dps);
        }
    }
    return rowwiseDPList;
}

//Utils.getColumnwiseDPCount = function (dpList) {
//    var cnt = 0;
//    for (var i = 0; i < dpList.length; i++) {
//        if (cnt != dpList[i].Row && cnt < dpList[i].Row) {
//            cnt = dpList[i].Row;
//        }
//    }
//    return cnt;
//}

Utils.addNoOfSpace = function (noOfSpace) {
    var str = '';
    for (var i = 0; i < noOfSpace; i++) {
        str += '&nbsp;';
    }
    return str;
}

Utils.typeof = function getClass(obj) {
    if (typeof obj === "undefined")
        return "undefined";
    if (obj === null)
        return "null";
    return Object.prototype.toString.call(obj)
        .match(/^\[object\s(.*)\]$/)[1];
}


Utils.compressArray = function (original) {

    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {

        var myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
            if (original[i] == copy[w]) {
                // increase amount of times duplicate is found
                myCount++;
                // sets item to undefined
                delete copy[w];
            }
        }

        if (myCount > 0) {
            var a = new Object();
            a.value = original[i];
            a.count = myCount;
            a.index = compressed.length+1;
            compressed.push(a);
        }
    }

    return compressed;
};

