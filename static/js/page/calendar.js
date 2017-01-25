'use strict';
$(document).ready(function() {
    
    var parseDate = function(ts) {
        let year = Number(ts.substring(0, 4));
        let month = Number(ts.substring(4, 6));
        let day = Number(ts.substring(6, 8));
        let hr = Number(ts.substring(9, 11));
        let min = Number(ts.substring(11, 13));
        let sec = Number(ts.substring(13, 15));
        return new Date(year, month, day, hr, min, sec).getTime() / 1000;
    };
    
    var unbackslash = function(orig) {
        let str = orig.slice(0);
        let ind = -1;
        while ((ind = str.indexOf('\\')) != -1) {
            let repl = str.charAt(ind + 1);
            if (repl === 'n')
                repl = '\n';
            str = str.substring(0, ind) + repl + str.substring(ind + 2, str.length);
        }
        return str;
    };
    
    var parseICal = function(lines, events) {
        let details = null;
        for (let i = 0; i < lines.length; i++) {
            let line = unbackslash(lines[i].trim());
            if (line === 'BEGIN:VEVENT')
                details = {};
            else if (line === 'END:VEVENT') {
                events.push(details);
                details = null;
            }
            else if (details != null) {
                if (line.startsWith('DTSTART:'))
                    details.startTime = parseDate(line.substring(8));
                else if (line.startsWith('DTEND:'))
                    details.endTime = parseDate(line.substring(6));
                else if (line.startsWith('DESCRIPTION:')) {
                    details.desc = line.substring(12);
                    while (i < lines.length - 1 && lines[i + 1].startsWith(' '))
                        details.desc += lines[++i].substring(1);
                    details.desc = unbackslash(details.desc);
                }
                else if (line.startsWith('SUMMARY:'))
                    details.name = line.substring(8);
                else if (line.startsWith('LOCATION:')) {
                    details.location = line.substring(9);
                    while (i < lines.length - 1 && lines[i + 1].startsWith(' '))
                        details.location += lines[++i].substring(1);
                    details.location = unbackslash(details.location);
                }
            }
        }
    };
    
    var q = document.parseQuery();
    q.start = Number(q.start) || 0;
    q.count = Number(q.count) || 10;
    /* TODO Finish implementation
    $.get('//cors.io/?u=http://calendar.google.com/calendar/ical/icrobotics.org_1naqtkhf3esdsbmvsli2dg9cos%40group.calendar.google.com/public/basic.ics', {}, function(r) {
        var lines = r.split('\n');
        var events = [];
        parseICal(lines, events);
        var eventDiv = $('#event-list');
        for (var i = 0; i < q.count; i++) {
            var e = events[q.start + i];
            var eBlock = $('<div>', {class: 'event-elem'}); // TODO style
            eBlock.html('<h3 class="event-name">{name}</h3><p class="event-date">{date}</p><br><p class="event-desc">{desc}</p>'.supplant({name: e.name, desc: e.desc, date: e.startTime}));
            eventDiv.append(eBlock);
        }
    });
    */
});