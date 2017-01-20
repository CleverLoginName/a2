<!-- Modal Dialog -->
<div class="modal fade" id="confirmDelete" role="dialog" aria-labelledby="confirmDeleteLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title modal-title-delete">Delete Parmanently</h4>
            </div>
            <div class="modal-body">
                <p>Are you sure about this ?</p>
            </div>
            <!--<div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirm">Delete</button>
            </div>-->
            <div class="wr_btn clearfix wr_btn_no_background">
                <input name="Save" type="submit" class="btn_save"  id="confirm" value="Yes">
                <a name="Reset" data-dismiss="modal" aria-hidden="true" class="btn_reset" id="Reset">No</a>
            </div>
        </div>
    </div>
</div>

<script>

    $('#confirmDelete').on('show.bs.modal', function (e) {
        $message = $(e.relatedTarget).attr('data-message');
        $(this).find('.modal-body p').text($message);
        $title = $(e.relatedTarget).attr('data-title');
        $(this).find('.modal-title').html('<img src="{!! url('/img/bin.png') !!}" />'+$title);

        // Pass form reference to modal for submission on yes/ok
        var form = $(e.relatedTarget).closest('form');
        $(this).find('.wr_btn_no_background #confirm').data('form', form);
    });

    <!-- Form confirm (yes/ok) handler, submits form -->
    $('#confirmDelete').find('.wr_btn_no_background #confirm').on('click', function(){
        $(this).data('form').submit();
    });
</script>

<style>
    .wr_btn_no_background{
        background: none;
    }
    .modal-title-delete{
        padding-left: 0px;
    }
</style>