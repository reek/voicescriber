import * as utils from '../../utils/utils';

export const getSkeleton = (filedata, isPrivate) => {
    return `
            <div id="${filedata.itemid}" class="card-panel hoverable">
            <h5>${filedata.title}</h5>
            <div>${filedata.datetime}</div>
            <div>${filedata.id}</div>
            <div id="${filedata.trackid}"></div>
            <h5><span class="current-time">00:00:00</span>/<span class="duration">00:00:00</span></h5>
            <div class="section">
                <a class="btn-floating btn-small waves-effect waves-light red backward"><i class="material-icons backward">fast_rewind</i></a>
                <a class="btn-floating btn-large waves-effect waves-light red play"><i class="material-icons play">play_arrow</i></a>
                <a class="btn-floating btn-small waves-effect waves-light red forward"><i class="material-icons forward">fast_forward</i></a>
            </div>
            <div class="section right-align">
            ${(!filedata.saved) ? '<a class="btn-floating waves-effect pulse waves-green green save"><i class="material-icons right save">save</i>save</a>'
            : `<a class="btn-floating waves-effect waves-light teal download" href="${filedata.url}" download="${utils.formatize([filedata.timestamp, filedata.title, filedata.extension].join('.'))}"><i class="material-icons right tooltipped download" data-position="top" data-tooltip="Download">file_download</i></a><a class="btn-floating waves-effect waves-light teal copy"><i class="material-icons right tooltipped copy" data-clipboard-text="${location.href}#!${filedata.ref}" data-position="top" data-tooltip="Copy share link">link</i></a>
            ${(isPrivate) ? `
            <a class="btn-floating waves-effect waves-light teal rename"><i class="material-icons right tooltipped rename" data-position="top" data-tooltip="Rename" data-ref="${filedata.ref}">edit</i></a>
            <a class="btn-floating waves-effect waves-light red delete"><i class="material-icons right tooltipped delete"  data-position="top" data-tooltip="Delete" data-itemid="${filedata.itemid}">clear</i></a>` : ``}
            `}
            </div>
        </div>`;
}