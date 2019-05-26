import $ from 'jquery';

export default function notificationListener(event) {
    if (event.type === 'notification') {
        $('#toastBody').text(event.message);
        $('#toast').toast('show');
    }
}