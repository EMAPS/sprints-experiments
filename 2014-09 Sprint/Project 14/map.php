<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>EMAPS Data Spring</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

<?php include('includes/config_management.php') ?>
<?php include('includes/codetop.php') ?>
        <style>
body {
    padding-top: 60px;
    padding-bottom: 40px;
}

.caption .description{
    height: 80px;
}

/*
 * Sigma
 */
.sigma-panel{
    position: relative;

    /* from http://www.colorzilla.com/gradient-editor/ */
    background: rgb(248,248,248); /* Old browsers */
    background: -moz-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(255,255,255,1) 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(248,248,248,1)), color-stop(100%,rgba(255,255,255,1))); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top, rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top, rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top, rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%); /* IE10+ */
    background: linear-gradient(to bottom, rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f8f8f8', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */

    border: 1px solid #eaeaea;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0px 3px 15px rgba(50, 20, 0, 0.10);
    -moz-box-shadow: inset 0px 3px 15px rgba(50, 20, 0, 0.10);
    box-shadow: inset 0px 3px 15px rgba(50, 20, 0, 0.10);

    margin-bottom: 10px;
  }
.sigma-expand{
    height: 500px;
}

/* Report */
#report, #csv_preview {
    padding: 3px;
    background: #eee;
    border-radius: 3px;
}
#report div.inner, #csv_preview div.inner {
    border: 1px solid #ccc;
    background: #FDFDFD;
    padding-left: 16px;
    max-height: 200px;
    overflow: auto;
}
.reportText {
    font-family: monospace;
    white-space: pre;
    margin: 1em 0px;
    font-family: Consolas, "Liberation Mono", Courier, monospace;
    font-size: 12px;
}

/* Key */
.keyItem{
    padding: 2px;
    margin-bottom: 15px;
}
        </style>

    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->

<?php include('includes/header.php') ?>




        <div class="container">

            <!-- Main hero unit for a primary marketing message or call to action -->
            <div class="splash-unit row">
                <div class="span7">
<!--                     <div class="image">
                        <a href="index.php"><img src="res/header.png"/></a>
                    </div>
 -->                    <div class="title">
                        Map
                    </div>
                </div>
                <div class="span5">
                    <div class="abstract">
                        <p></p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="span12">
                    <div class="sigma-panel" id="sigma-main">
                        <!-- <div class="sigma-overlay sigma-messages">
                          <span class="label label-primary">Overview</span>
                          <span class="label label-default">123 nodes</span>
                          <span class="label label-default">456 edges</span>
                          <span class="label label-danger">No layout</span>
                        </div> -->
                        <div class="sigma-overlay sigma-pending">
                            <div class="progress progress-striped active">
                                <div class="progress progress-striped active"><div class="bar" style="width: 100%;">
                                    Network loading...
                                </div></div>
                            </div>
                        </div>
                        <div class="sigma-expand" id="sigma-container"></div>
                    </div>
                </div>
            </div>

            <div class="row" id="key">
            </div>

            <div class="row" style="display: none;">
                <div class="span12">
                    <h4>Report</h4>
                    <div id="report">
                        <div class="inner">
                            <div class="reportText">Please wait. It might take few minutes.</div>
                        </div>
                    </div>
                </div>
            </div>

            

        <?php include("includes/footer.php"); ?>

        <?php include("includes/codebottom.php"); ?>

        <script src="js/libs/sigma.min.js"></script>
        <script src="js/libs/sigma.parsers.gexf.min.js"></script>
        <script src="js/_page_map.js"></script>
    </body>
</html>
