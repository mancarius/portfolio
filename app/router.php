<?php
define('__ROOT__', __DIR__);
require_once __ROOT__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__ROOT__);
$dotenv->load();

$klein = new \Klein\Klein();



$klein->respond('GET', '/', function ($req, $res) {
    if($_ENV['MODE'] === "DEV")
        return $res->redirect('/public/index.html');
    else
        return $res->redirect('/index.html');
});



$klein->respond('POST', '/api/[:controller]?/[:action]?/', function ($req, $res) {

    $response['success'] = false;


    switch ($req->controller) {

        case 'message':

            $post = $req->params();
        
            switch ($req->action) {

                case 'send':

                    require_once __DIR__ . '/controllers/sendMessage.php';

                    $sendMessage = new sendMessage();

                    $recaptcha = $sendMessage->checkRobots($post['token']);

                    if ($recaptcha['success']) {
                        $response = $sendMessage->send($post['cEmail'], $post['cName'], $post['cSubject'], $post['cMessage'], isset($post['cCopy']));
                    }
                    else{
                        $response['error'] = 'You are a robot!';
                    }

                    return json_encode($response);

                default:
                    $response['line'] = __FILE__ . ':' .__LINE__;
                    return json_encode($response);
            }
            break;

        default:
            $response['line'] = __FILE__ . ':' . __LINE__;;
            return json_encode($response);

    }

});



$klein->dispatch();
?>