const moment = require('moment');

function formatTimeAgo(publishedAt) {
    const now = moment();
    const published = moment(publishedAt);
    const duration = moment.duration(now.diff(published));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    let timeAgo = '';
    if (years > 0) {
        timeAgo = `${years} năm, ${months} tháng trước`;
    } else if (months > 0) {
        timeAgo = `${months} tháng, ${days} ngày trước`;
    } else if (days > 0) {
        timeAgo = `${days} ngày, ${hours} giờ trước`;
    } else if (hours > 0) {
        timeAgo = `${hours} giờ, ${minutes} phút trước`;
    } else if (minutes > 0) {
        timeAgo = `${minutes} phút, ${seconds} giây trước`;
    } else {
        timeAgo = `${seconds} giây trước`;
    }
    return timeAgo;
}

export default formatTimeAgo;