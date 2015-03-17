require 'haml'

module Jekyll
  class HamlConverter < Converter
    safe true
    priority :low

    def matches(ext)
      ext =~ /haml/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      engine = Haml::Engine.new(content)
      engine.render
    end

  end

  class HamlPartialTag < Liquid::Tag

    def render(context)
      file = Liquid::Template.parse(@markup.strip).render(context)

      includes_dir = File.join(context.registers[:site].source, '_includes')

      if File.symlink?(includes_dir)
        puts "Includes directory '#{includes_dir}' cannot be a symlink"
        return
      end
      if file !~ /^[a-zA-Z0-9_\/\.-]+$/ || file =~ /\.\// || file =~ /\/\./
        puts "Include file '#{file}' contains invalid characters or sequences"
        return
      end
      if file !~ /\.haml$/
        puts "File must have \".haml\" extension"
        return
      end

      Dir.chdir(includes_dir) do
        choices = Dir['**/*'].reject { |x| File.symlink?(x) }
        if choices.include?(file)
          source = File.read(file)
          # conversion = ::Haml::Engine.new(source).render
          # partial = Liquid::Template.parse(conversion)
          partial = Liquid::Template.parse(source)
          begin
            return partial.render!(context)
          rescue => e
            puts "Liquid Exception: #{e.message} in #{self.data["layout"]}"
            e.backtrace.each do |backtrace|
              puts backtrace
            end
            abort("Build Failed")
          end
          context.stack do
            return partial.render(context)
          end
        else
          "Included file '#{file}' not found in _includes directory"
        end
      end
    end

  end
end

Liquid::Template.register_tag('haml', Jekyll::HamlPartialTag)