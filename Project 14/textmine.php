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

#query-ui{
    height: 60px;
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
    min-height: 50px;
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
                        Text Mine
                    </div>
                </div>
                <div class="span5">
                    <div class="abstract">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="span12">
                    <div id="query-ui">
                        <div class="input-append">
                            <input class="span11" type="text" placeholder='Type some words or expressions. Example: arctic AND ("climate change" OR "global warming") ' id="query-input-simple">
                            <button class="btn" type="button">Run Query</button>
                        </div>
                        <div class="progress progress-striped active" style="display:none;">
                            <div class="progress progress-striped active"><div class="bar" style="width: 100%;" id="query-bar">
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="span12">
                    <h4>Report</h4>
                    <div id="report">
                        <div class="inner">
                            <div class="reportText"></div>
                        </div>
                    </div>
                </div>
            </div>
            

        <?php include("includes/footer.php"); ?>

        <?php include("includes/codebottom.php"); ?>

        <script src="js/_page_textmine.js"></script>
    </body>
</html>
