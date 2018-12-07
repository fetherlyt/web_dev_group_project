<?php

/*
 * User: lyang
 * Date: 9/7/17
 *
 * Router is a special kind of controller which calls appropriate
 * controller according to the user's URL address. The router renders the view
 * of this particular controller into the layout template.
 *
 * The design here is that the first url path value is the name of the controller.
 *
 * Class RouterController
 */

class RouterController extends AbstractBaseController
{
    /**
     * @var Controller The inner controller instance
     */
    protected $controller;

    /**
     * Parses the URL address using slashes and returns params as array
     * @param string $url The URL address to be parsed
     * @return array The URL parameters
     */
    private function parseUrl($url)
    {
        // Parses URL parts into an associative array
        $parsedUrl = parse_url($url);
        // Removes the leading slash
        $parsedUrl["path"] = ltrim($parsedUrl["path"], "/");
        // Removes white-spaces around the address
        $parsedUrl["path"] = trim($parsedUrl["path"]);
        // Splits the address by slashes
        $explodedUrl = explode("/", $parsedUrl["path"]);
        return $explodedUrl;
    }

    /**
     * Converts dashed controller name from URL into a CamelCase class name
     * @param string $text The controller name using dashes like article-list
     * @return string The class name of the controller like ArticleList
     */
    private function dashesToCamel($text)
    {
        $text = str_replace('-', ' ', $text);
        $text = ucwords($text);
        $text = str_replace(' ', '', $text);
        return $text;
    }

    /**
     * Parses the URL address and creates appropriate controller
     * @param array $params The URL address as an array of a single element
     */
    public function process($params)
    {
        $parsedUrl = $this->parseUrl($params[0]);

        if (empty($parsedUrl[0])) {
            $this->respond();
        }

        // The controller name is the 1st URL parameter
        $controllerClass = $this->dashesToCamel(array_shift($parsedUrl)) . 'Controller';

        if (file_exists('controller/' . $controllerClass . '.php'))
            $this->controller = new $controllerClass;
        else {
            $ref_id = time();
            error_log($ref_id . " - No Controller Found: " . $controllerClass);
            $this->respond();
        }

        // Calls the controller
        $this->controller->process($parsedUrl);
        $this->controller->respond();
    }
}