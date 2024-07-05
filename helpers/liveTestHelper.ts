export function getExamLiveStatus(liveStatus:'live' | 'finished' | 'paused' | '') {
    switch (liveStatus) {
        case "finished":
            return'منتهي'

        case "live":
            return'نشط'

        case "paused":
            return'متوقف'

        case "":
            return'لم يبدأ بعد'
        default:
            return'غير معروف'
    }

}
export function getExamLiveStatusBadge(liveStatus:'live' | 'finished' | 'paused' | '') {
    switch (liveStatus) {
        case "finished":
            return'info'
        case "live":
            return'success'

        case "paused":
        case "":
        default:
            return'primary'
    }

}
