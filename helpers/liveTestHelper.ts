export function getExamLiveStatus(liveStatus:'live' | 'finished' | 'paused' | '') {
    switch (liveStatus) {
        case "finished":
            return'منتهي'

        case "live":
            return'نشط'

        case "paused":
            return'متوقف'

        case "":
        default:
            return'لم يبدأ بعد'
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
