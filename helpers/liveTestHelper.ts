export function getExamLiveStatus(liveStatus:'live' | 'finished' | 'paused' | '') {
    switch (liveStatus) {
        case "finished":
            return'منتهي'

        case "live":
            return'نشط'

        case "paused":
            return'متوقف'

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
        default:
            return'primary'
    }

}
