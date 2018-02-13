<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Sprint Emaps 2014</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

<?php include('includes/config_management.php') ?>
<?php include('includes/codetop.php') ?>
        <link rel="stylesheet" type="text/css" href="css/jquery.svg.css">
        <style>


            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }

            .caption .description{
                height: 80px;
            }

            @import url(http://fonts.googleapis.com/css?family=PT+Serif|PT+Serif:b|PT+Serif:i|PT+Sans|PT+Sans:b);

            #chart {
              height: 500px;
              width: 100%;
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
                        Sprint Emaps 2014
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
                    <div id="chart"></div>
                </div>
            </div>

            <div class="row">
                <div class="span12">
                    <h4>Settings</h4>
                    <label class="radio">
                        <input type="radio" name="optionsRadios" id="mode_normal" value="normal" checked/>
                        <strong>Normal</strong> - All participations are displayed
                    </label>
                    <label class="radio">
                        <input type="radio" name="optionsRadios" id="mode_filtered" value="filtered"/>
                        <strong>Filtered</strong> - Only with 4+ persons from one arena to another
                    </label>
                    <label class="radio">
                        <input type="radio" name="optionsRadios" id="mode_sideevent" value="filtered"/>
                        <strong>Side Events</strong> - People that participated to a Side Event (once or more)
                    </label>
                    <label class="radio">
                        <input type="radio" name="optionsRadios" id="mode_nosideevent" value="filtered"/>
                        <strong>NO Side Event</strong> - People that NEVER participated to a Side Event
                    </label>
                    <label class="radio">
                        <input type="radio" name="optionsRadios" id="mode_person" value="filtered"/>
                        <strong>Single person</strong> - A person's trajectory. Pick in the list, ordered by amount of participations
                        <br/><select id="selector_persons" class="span6"></select>
                    </label>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>

            <div class="row">
                <div class="span12">
                    <h4>Report</h4>
                    <div id="report">
                        <div class="inner">
                            <div class="reportText"> </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <?php include("includes/footer.php"); ?>

        <?php include("includes/codebottom.php"); ?>

        <script type="text/javascript" src="js/libs/jquery.svg.js"></script>
        <script src="js/_page_trajectories.js"></script>
    </body>
</html>
