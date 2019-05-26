export const getSkeleton = (allowed, maxSize) => {
    return `
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s3">
                    <a id="browseButton" class="waves-effect waves-light btn browse"><i class="material-icons right">attachment</i>Browse</a>
                    <input class="waves-effect waves-light btn hide" id="file" type="file">
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">file</i>
                    <input disabled value="No file selected" id="fileName" type="text">
                    <span class="helper-text" data-error="wrong" data-success="right">Allowed: ${allowed} Max: ${maxSize}</span>
                </div>
                <div class="input-field col s3">
                    <a id="importButton" class="waves-effect waves-light btn import hide"><i class="material-icons right">publish</i>Import</a>
                </div>
            </div>
        </form>
    </div>
    `;
}