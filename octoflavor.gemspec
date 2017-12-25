# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "octoflavor"
  spec.version       = "1.0.0"
  spec.authors       = ["Yukai Huang"]
  spec.email         = ["nyan@yukaii.tw"]

  spec.summary       = %q{A GitHub-like theme for Jekyll.}
  spec.homepage      = "https://github.com/Yukaii/octoflavor"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }

  spec.add_runtime_dependency "jekyll", "~> 3.6"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"

  spec.add_runtime_dependency "jekyll-redirect-from", "~> 0.13"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.1"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-compose", "~> 0.6"
  spec.add_runtime_dependency "jekyll-octicons", "~> 4.0"

  spec.add_runtime_dependency "jekyll-import", "~> 0.13"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
