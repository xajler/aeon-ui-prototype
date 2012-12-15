$(document).ready(function () {
    $('#dashboard').sortable({
        forcePlaceholderSize: false,
        placeholder: 'bla',
        axis: 'x'
    }).disableSelection();

    $('.pull_dashboard-settings').toggle(function(){
            $('#dashboard-settings').animate({left:'0px'});
            return false;
        },
        function(){
            $('#dashboard-settings').animate({left:'-296px'});
            return false;
        }
    );

    $('#dashboard #completed').hide('fast', function() {
        recalculateDashboardContainersWidth();
        $('input:checkbox[value="backlog"]').attr("checked", true);
        $('input:checkbox[value="current"]').attr("checked", true);
        $('input:checkbox[value="features"]').attr("checked", true);
        $('input:checkbox[value="ideas"]').attr("checked", true);
    });

    $('input:checkbox[name="containers"]').click(function() {
        var containerId = $(this).val();
        var isVisible;

        if($(this).is(":checked")) {
            isVisible = true;
        } else {
            isVisible = false;
        }

        setContainerVisibilityAndSettingsState(containerId, isVisible);
    });

    $('.close').click(function() {
        var containerId = $(this).val();
        setContainerVisibilityAndSettingsState(containerId, false);
    });

    function recalculateDashboardContainersWidth() {
        var width = calculateContainerWidth();
        var containers = getKnownDashboardContainters();

        for (var i = 0; containers.length > i; i++) {
            setContainerWidth(containers[i], width);
        }
    }

    function calculateContainerWidth() {
        var dashboardContainersCount = $('#dashboard li:visible').length;
        switch (dashboardContainersCount) {
            case 3:
                return '33%';
            case 2:
                return '49.5%';
            case 1:
                return '99%';
            default:
                return '24.5%';
        }
    }

    function setContainerWidth(containerId, width) {
        if ($('#dashboard #' + containerId).is(':visible')) {
            $('#dashboard #' + containerId).width(width);
        }
    }

    function setContainerVisibilityAndSettingsState(containerId, isVisible) {
        if (isVisible) {
            $('#' + containerId).show('slow', function() {
                recalculateDashboardContainersWidth();
            });
        } else {
            $('#' + containerId).hide('slow', function(){
                recalculateDashboardContainersWidth();
            });
            $('input:checkbox[value="' + containerId + '"]').attr("checked", false);
        }
    }

    function getKnownDashboardContainters() {
        return ['backlog', 'current', 'features', 'ideas', 'completed'];
    }
});
