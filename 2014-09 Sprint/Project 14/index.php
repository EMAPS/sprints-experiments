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
                        EMAPS Data Spring
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
                    <ul>
                        <li>
                            <a href="map.php">Map of web entities</a> without any query (map background)
                        </li>
                        <li>
                            <a href="querymap.php">Map X Query</a> - Visualize a query on the map and get cross-results
                        </li>
                        <li>
                            <a href="textmine.php">Top n-grams</a> - Dig for the most used expressions in the results of a query
                        </li>
                        <li>
                            <a href="crosscount.php">Cross Count</a> - Look at the number of pages by query crossings. A <a href="crosscount2.php">different set of queries</a> is also available.
                        </li>
                    </ul>
                </div>
            </div>

            

        <?php include("includes/footer.php"); ?>

        <?php include("includes/codebottom.php"); ?>

        <script src="js/_page_index.js"></script>
    </body>
</html>
